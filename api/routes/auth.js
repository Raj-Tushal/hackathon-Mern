import express from 'express'
import { getByToken, googleAuth, login, register, uploadVideo } from '../controllers/auth.js'
import verifyToken from '../middlewares/verifyToken.js'
import upload from '../services/upload.js'
const router = express.Router()

// Register user
router.post('/register',register)

// Register user
router.post('/login',login)

// Register user
router.post('/google',googleAuth)

// to get user by token
router.get('/me',verifyToken,getByToken)

router.post('/upload',upload.single('avatar'),verifyToken,uploadVideo)
export default router;

