import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
});

const skill = mongoose.model("skills", skillSchema);

export {skill, skillSchema};



