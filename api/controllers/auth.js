import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import { sendSuccess, sendError } from "../utils/response.js";


const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // 8-character password
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, cnic, isAdmin } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      cnic,
      isAdmin: isAdmin || false, // Default to false if not provided
    });

    await newUser.save();

    res.status(201).json(sendSuccess({ message: "User registered successfully" }));
  } catch (error) {
    res.status(500).json(sendError({ message: error.message }));
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(sendError({ message: "User not found" }));
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(sendError({ message: "Invalid credentials" }));
    }

    // Check if the password is the default random password
    const isDefaultPassword = password === user.password; // If password matches, it's the one sent by email
    if (isDefaultPassword) {
      return res.status(200).json(sendSuccess({
        status: true,
        message: "Login successful. Please change your password.",
      }));
    }

    // Generate JWT token for authentication
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send success response with token
    res.status(200).json(sendSuccess({
      status: true,
      message: "Login successful",
      data: { token, isAdmin: user.isAdmin },
    }));
  } catch (error) {
    res.status(500).json(sendError({ message: error.message }));
  }
};


export const proceedLoan = async (req, res) => {
  const { cnic, email, name } = req.body;

  if (!cnic || !email || !name) {
    return res.status(400).json(sendError({ message: "Missing required fields" }));
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ cnic, email });
    if (existingUser) {
      return res.status(400).json(sendError({ message: "User already exists" }));
    }

    // Generate a random password
    const password = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ cnic, email, name, password: hashedPassword });
    await newUser.save();

    // Send email to the user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Add your email address to .env
        pass: process.env.EMAIL_PASS, // Add your email password to .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Account Password",
      text: `Hello ${name},\n\nYour account has been created. Here is your password: ${password}\n\nPlease log in and change your password.\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    // Success response with explicit email confirmation
    res.status(201).json(sendSuccess({
      status: true,
      message: `User registered successfully. Password has been sent to the email address: ${email}.`,
    }));
  } catch (error) {
    res.status(500).json(sendError({
      status: false,
      message: "Error processing loan application",
      error: error.message,
    }));
  }
};


// Change Password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Assuming you're using JWT auth and the user is in req.user

  if (!oldPassword || !newPassword) {
    return res.status(400).json(sendError({ message: "Both old and new passwords are required." }));
  }

  try {
    // Find user in the database by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(sendError({ message: "User not found" }));
    }

    // Check if the old password is correct
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(401).json(sendError({ message: "Old password is incorrect" }));
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    // Return success response
    res.status(200).json(sendSuccess({ message: "Password changed successfully" }));
  } catch (error) {
    res.status(500).json(sendError({ message: error.message }));
  }
};

