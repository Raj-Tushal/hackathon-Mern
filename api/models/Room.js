import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true
    },
    desc: {
      type: String,
      default: false,
    },
    roomNumbers: [
        {
            number: Number,
            unavailableDates: {type: [Date]}
        }
    ],

  },
  { timestamps: true }
);

export default mongoose.model("Rooms",roomSchema)