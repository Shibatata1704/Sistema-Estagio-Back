import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  id:{
    type: Number,
  },
  nome: {
    type: String,
    required: true,
  },
},{ _id: false});

const skills = mongoose.model("skills", skillSchema);

export {skills, skillSchema};



