import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendSuccess, sendError } from "../utils/response.js";
import { responseMessages } from "../constants/responseMessages.js";
import Users from "../models/User.js";


import { BADREQUEST, ALREADYEXISTS, CREATED, OK } from "../constants/httpStatus.js";
import handleUpload from "../services/cloudinaryConfig.js";

const {
  GET_SUCCESS_MESSAGES,
  INVITATION_LINK_UNSUCCESS,
  MISSING_FIELDS,
  MISSING_FIELD_EMAIL,
  NO_USER,
  NO_USER_FOUND,
  PASSWORD_AND_CONFIRM_NO_MATCH,
  UPDATE_SUCCESS_MESSAGES,
  DELETED_SUCCESS_MESSAGES,
  UPDATE_UNSUCCESS_MESSAGES,
  DELETED_UNSUCCESS_MESSAGES,
  GET_UNSUCCESS_MESSAGES,
  ERROR_MESSAGES,
  PASSWORD_CHANGE,
  PASSWORD_FAILED,
  RESET_LINK_SUCCESS,
  SUCCESS_REGISTRATION,
  UN_AUTHORIZED,
  USER_EXISTS,
  USER_NAME_EXISTS,
} = responseMessages;

// register
export const register = async (req, res) => {
  const { userName, email, password } = req.body;

  // if any field is miing
  if (!userName || !email || !password) {
    return res.status(BADREQUEST) //BADREQUEST
      .send(
        sendError({ status: false, message: responseMessages.MISSING_FIELDS })
      );
    // .send("Missing Fields");
  }
  try {
    // if user already exists
    const user = await Users.findOne({ email: email });
    if (user) {
      return res
        .status(ALREADYEXISTS) //BADREQUEST
        .send(
          sendError({ status: false, message: responseMessages.USER_EXISTS })
        );
    }

    // creaet user
    else {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const newUser = new Users({
        userName,
        email,
        password: hashPass,
      });

      const savedUser = await newUser.save();

      savedUser.password = undefined;

      res.status(CREATED).send({
        status: true,
        message: responseMessages.SUCCESS_REGISTRATION,
        data: savedUser,
      });
    }
  } catch (error) {
    return (
      res
        .status(500) //INTERNALERROR
        // .send(sendError({ status: false, message: error.message, error }));
        .send(error.message)
    );
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if any field is miing
    if (!email || !password) {
     throw new Error(MISSING_FIELD_EMAIL);
    }

    const user = await Users.findOne({ email: email });
    // console.log(user, 'user')
    // if USER DONT EXIST
    if (!user) {
      return res
        .status(404)
        .send(sendError({ status: false, message: NO_USER_FOUND }));
    }

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      // IN CORRECT PASWWORD
      if (!isValid)
        return res
          .status(401)
          .send(sendError({ status: false, message: UN_AUTHORIZED }));

      if (isValid) {
        user.password = undefined;
        const token = jwt.sign({ userData: user }, process.env.JWT);
        res.status(200).json(
          sendSuccess({
            status: true,
            message: responseMessages.GET_SUCCESS_MESSAGES,
            data: user,
            token: token,
          })
        );
      }
    }
  } catch (error) {
   res.send(sendError({ status: false, message: error.message, error: error.message }));
  }
};

export const googleAuth = async (req, res) => {
  const { userName, email, profilePic } = req.body;

  // Check for missing fields
  if (!userName || !email || !profilePic) {
    return res.status(400) // BADREQUEST
      .send(
        sendError({ status: false, message: responseMessages.MISSING_FIELDS })
      );
  }

  try {
    // Check if user already exists
    const user = await Users.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ userData: user }, process.env.JWT);
      return res
        .status(OK) // ALREADYEXISTS
        .send(
          sendSuccess({ status: true, message: responseMessages.ADD_SUCCESS_MESSAGES,token: token, data: {...user._doc, fromGoogle: true}})
        );
    }

    // Create and save the new user
    const newUser = new Users({
      userName,
      email,
      profilePic,
    });

    let savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userData: savedUser }, process.env.JWT);

    res.status(201) // CREATED
      .send(
        sendSuccess({
          status: true,
          message: responseMessages.SUCCESS_REGISTRATION,
          data: savedUser,
          token: token,
        })
      );
  } catch (error) {
    return res
      .status(500) // INTERNAL SERVER ERROR
      .send(sendError({ status: false, message: error.message, error: error.message }));
  }
};


// get user By Token
export const getByToken = (req,res)=>{
const user = req.user.userData;
if(!user) return res.status(200).json(sendError({ status: false, message: NO_USER, data: user }));

res.status(200).json(sendSuccess({ status: true, message: GET_SUCCESS_MESSAGES, data: user }));

}



export const uploadVideo = async (req, res) => {
  console.log(req.file, "file"); // Correct logging for single file upload
  console.log(req.user.userData, "user");

  const user = await Users.findById(req.user.userData._id);

  if (!user) {
    return res
      .status(404)
      .json(sendError({ status: false, message: NO_USER }));
  }

  // Initialize thumbnail data
  let profilePic = null;

  // Process the thumbnail file if uploaded
  if (req.file) {
    const imgFile = req.file; // Single file upload is available in req.file
    const result = await handleUpload(imgFile.path); // Upload to cloud storage (e.g., Cloudinary, AWS S3)
    profilePic = result.url;
  }

  let updatedUser = await Users.findByIdAndUpdate(
    user._id,
    { profilePic },
    { new: true }
  );

  // Send the response  
  res.status(200).json(
    sendSuccess({
      status: true,
      message: UPDATE_SUCCESS_MESSAGES,
      data: updatedUser,
    })
  );
};

