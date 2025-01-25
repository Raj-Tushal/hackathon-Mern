import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: {
    type: String,
    default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    fromGoogle: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users",userSchema)