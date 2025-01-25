import express from 'express';
import Hotel from '../models/Hotel.js';
import verifyToken from '../middlewares/verifyToken.js';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from '../controllers/room.js';
const  router = express.Router();


//CREATE
router.post("/:hotelId",verifyToken,createRoom )

//UPDATE
router.put("/:id",verifyToken, updateRoom)

//UPDATE
router.put("/availability/:id", updateRoomAvailability);

//DELETE
router.delete("/:id/:hotelId",verifyToken, deleteRoom)

//GET
router.get("/:id", getRoom)

//GETALL
router.get("/",getRooms )

export  default router;