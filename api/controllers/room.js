import { INTERNALERROR, OK } from "../constants/httpStatus.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { sendError, sendSuccess } from "../utils/response.js";
import { responseMessages } from "../constants/responseMessages.js";

//create
export const createRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  // Validate input
  if (!hotelId || hotelId.toString().length !== 24) {
    return res.status(400).json({
      status: false,
      message: "Hotel ID missing or invalid",
    });
  }

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
      res.status(200).json({
        status: true,
        message: responseMessages.ADD_SUCCESS_MESSAGES,
        data: {
          roomId: savedRoom._id,
          createdAt: savedRoom.createdAt,
        },
      });
    } catch (error) {
      res.status(INTERNALERROR).json({
        status: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(INTERNALERROR).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateRoom = async (req, res) => {
  // Validate input
  if (!req.params.id || req.params.id.toString().length !== 24) {
    return res.status(400).json({
      status: false,
      message: "Hotel ID missing or invalid",
    });
  }

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedHotel) {
      res
        .status(NOTFOUND)
        .json(sendError({ status: false, message: UPDATE_UNSUCCESS_MESSAGES }));
    }
    res.status(OK).json(
      sendSuccess({
        status: true,
        message: responseMessages.UPDATE_SUCCESS_MESSAGES,
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateRoomAvailability = async (req, res) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(OK).json(
      sendSuccess({
        status: true,
        message: responseMessages.UPDATE_SUCCESS_MESSAGES,
      })
    );
  } catch (err) {
    res
    .status(500)
    .json(
      sendError({
        status: false,
        message: ERROR_MESSAGES,
        error: err.message,
      })
    );
  }
};

export const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  const roomId = req.params.id;

  // Validate input
  if (!hotelId || !roomId) {
    return res.status(400).json({
      status: false,
      message: "Hotel ID and Room ID are required",
    });
  }

  try {
    // Delete the room
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({
        status: false,
        message: "Room not found or already deleted",
      });
    }

    try {
      // Update the hotel to remove the room ID
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });

      // Use the `useSuccess` function to send a formatted success response
      return res.status(200).json(
        sendSuccess({
          status: true,
          message: "Room deleted successfully",
          data: {
            roomId: deletedRoom._id,
          },
        })
      );
    } catch (hotelUpdateError) {
      return res.status(500).json({
        status: false,
        message: `Failed to update hotel: ${hotelUpdateError.message}`,
      });
    }
  } catch (roomDeleteError) {
    return res.status(500).json({
      status: false,
      message: `Error deleting room: ${roomDeleteError.message}`,
    });
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res
        .status(NOTFOUND)
        .json(sendError({ status: false, message: GET_UNSUCCESS_MESSAGES }));
    }
    res
      .status(OK)
      .json(
        sendSuccess({ status: true, message: GET_SUCCESS_MESSAGES, data: room })
      );
  } catch (error) {
    res.status(500).json(
      sendError({
        status: false,
        message: ERROR_MESSAGES,
        error: error.message
      })
    );
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    if (!rooms) {
      res
        .status(NOTFOUND)
        .json(sendError({ status: false, message: GET_UNSUCCESS_MESSAGES }));
    }
    res.status(OK).json(
      sendSuccess({
        status: true,
        message: GET_SUCCESS_MESSAGES,
        data: rooms,
      })
    );
  } catch (error) {
    res.status(500).json(
      sendError({
        status: false,
        message: ERROR_MESSAGES,
        error: error.message,
      })
    );
  }
};
