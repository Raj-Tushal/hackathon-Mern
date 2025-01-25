import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { responseMessages } from "../constants/responseMessages.js";
import {
  CREATED,
  OK,
  BADREQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOTFOUND,
  NOTALLOWED,
  INTERNALERROR,
  ALREADYEXISTS,
} from "../constants/httpStatus.js";

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

export const addHotel = async (req, res) => {
  const hotel = new Hotel(req.body);
  try {
    const savedHotel = await hotel.save();
    res
      .status(OK)
      .json(
        sendSuccess({
          status: true,
          message: GET_SUCCESS_MESSAGES,
          data: { _id: savedHotel._id, name: savedHotel.name },
        })
      );
  } catch (error) {
    res
      .status(500)
      .json(
        sendError({
          status: false,
          message: ERROR_MESSAGES,
          error: error.message,
        })
      );
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedHotel) {
      res
        .status(NOTFOUND)
        .json(sendError({ status: false, message: UPDATE_UNSUCCESS_MESSAGES }));
    }
    res
      .status(OK)
      .json(
        sendSuccess({
          status: true,
          message: responseMessages.UPDATE_SUCCESS_MESSAGES,
        })
      );
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const deleteddHotel = await Hotel.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!deleteddHotel) {
      res
        .status(NOTFOUND)
        .json({ status: false, message: DELETED_UNSUCCESS_MESSAGES });
    }
    res
      .status(OK)
      .json(sendSuccess({ status: true, message: DELETED_SUCCESS_MESSAGES }));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      res
        .status(NOTFOUND)
        .json(sendError({ status: false, message: GET_UNSUCCESS_MESSAGES }));
    }
    res
      .status(OK)
      .json(
        sendSuccess({
          status: true,
          message: GET_SUCCESS_MESSAGES,
          data: hotel,
        })
      );
  } catch (error) {
    res
      .status(500)
      .json(
        sendError({
          status: false,
          message: ERROR_MESSAGES,
          error: error.message,
        })
      );
  }
};



export const getAllHotels = async (req, res) => {
  try {
    // Parse query parameters
    const { min = 0, max = 999, limit: limitQuery } = req.query;
    let featuredHotel = req.query.featuredHotel === "true"; // Convert string to boolean
    const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;

    // Construct the query object
    const query = {
      featuredHotel, // Boolean value
      cheapestPrice: { $gt: parseInt(min, 10), $lt: parseInt(max, 10) }, // Number values
    };

    // console.log("Query Object:", query); // Debugging

    // Fetch data from MongoDB
    const hotels = await Hotel.find(query).limit(limit);

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No hotels found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Got Resource Successfully",
      data: hotels,
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getByCity = async (req, res) => {
  let {city,min,max} = req.query
  try {
    const hotel = await Hotel.find(
      {city:city,
         cheapestPrice: { $gt: parseInt(min, 10), $lt: parseInt(max, 10) }
      })
    if (!hotel) {
      res
        .status(NOTFOUND)
        .json(sendError({ status: false, message: GET_UNSUCCESS_MESSAGES }));
    }
    res
      .status(OK)
      .json(
        sendSuccess({
          status: true,
          message: GET_SUCCESS_MESSAGES,
          data: hotel,
        })
      );
  } catch (error) {
    res
      .status(500)
      .json(
        sendError({
          status: false,
          message: ERROR_MESSAGES,
          error: error.message,
        })
      );
  }
};

export const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res
      .status(OK)
      .json(
        sendSuccess({ status: true, message: GET_SUCCESS_MESSAGES, data: list })
      );
  } catch (error) {
    res
      .status(500)
      .json(
        sendError({
          status: false,
          message: ERROR_MESSAGES,
          error: error.message,
        })
      );
  }
};

export const countByType = async (req, res) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const villaCount = await Hotel.countDocuments({ type: "Villa" });
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" });
    res.status(OK).json(
      sendSuccess({
        status: true,
        message: GET_SUCCESS_MESSAGES,
        data: [
          { type: "Hotel", count: hotelCount },
          { type: "Apartment", count: apartmentCount },
          { type: "Resort", count: resortCount },
          { type: "Villa", count: villaCount },
          { type: "Cabin", count: cabinCount },
        ],
      })
    );
  } catch (error) {
    res
      .status(500)
      .json(
        sendError({
          status: false,
          message: ERROR_MESSAGES,
          error: error.message,
        })
      );
  }
};

export const getHotelRooms = async (req, res) => {
  console.log(req.params.hotelId)
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
        const list = await Promise.all(hotel.rooms.map((room) => {
      return Room.findById(room);
    }))

    res.status(OK).json(
        sendSuccess({ status: true, message: GET_SUCCESS_MESSAGES, data: list })
      );
  } catch (error) {
    res
      .status(500)
      .json(
        sendError({
          status: false,
          message: ERROR_MESSAGES,
          error: error.message,
        })
      );
  }
}