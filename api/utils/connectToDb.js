import mongoose from 'mongoose';
const connectDb = async () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("CONNECTED TO MONGO DB")
    })
    .catch((e)=>{
        console.log("ERROR CONNECTING TO DB"+e)
    })
}

export default connectDb;