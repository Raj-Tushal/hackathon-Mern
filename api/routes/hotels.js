import express from 'express';
import Hotel from '../models/Hotel.js';
import { addHotel, countByCity, countByType, deleteHotel, getAllHotels, getByCity, getHotel, getHotelRooms, updateHotel } from '../controllers/hotel.js';
import verifyToken from '../middlewares/verifyToken.js';
const router = express.Router();
import multer from 'multer';
import upload from '../services/upload.js';


//CREATE
router.post("/",verifyToken, addHotel)

//UPDATE
router.put("/:id",verifyToken, updateHotel)

//DELETE
router.delete("/:id",verifyToken, deleteHotel)

//GET
router.get("/find/:id", getHotel)

router.get("/byCityName", getByCity)

//GETALL
router.get("/",getAllHotels )

//GET BY CIRT NAME
router.get("/countByCity",countByCity)

//GET BY count 
router.get("/countByType",countByType)

//GET BY count 
router.get("/rooms/:hotelId",getHotelRooms)

export  default router;