dotenv.config();
import express from 'express';
import cors from 'cors'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import connectDb from './utils/connectToDb.js';
import authRoute from './routes/auth.js'
import loanRoute from './routes/loan.js'
import usersRoute from './routes/users.js'
const app =express();
connectDb()

// middlewares functions
app.use(cors());
app.use(express.json());
app.use(cookieParser())


// routes
app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/loans", loanRoute); // Loan-related routes
app.use("/api/admin", usersRoute);
// app.use('/api/hotels',hotelsRoute)
// app.use('/api/rooms',roomsRoute)


app.listen(process.env.PORT,()=>{
    console.log("server is running..")
})
