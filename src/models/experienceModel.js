import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  nomeEmpresa:{
    type: String,
    required: true,
  },
  inicio:{
    type: Date,
    required: true,
  },
  fim:{
    type: Date,
  },
  cargo:{
    type: String,
    required: true,
  }
});

const experience = mongoose.model("whitelist", experienceSchema);

export default experience;



