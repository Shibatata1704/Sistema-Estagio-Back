import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  token:{
    type: String,
    required: true,
  },
  loggedAt:{
    type: Date,
    default: Date.now,
  },
});

const auth = mongoose.model("whitelist", authSchema);

export default auth;



