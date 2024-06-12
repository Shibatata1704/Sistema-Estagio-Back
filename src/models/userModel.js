import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {skillSchema} from "./skillModel.js";

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  senha:{
    type: String,
    required: true,
  },
  //habilidade: skillSchema,
  createdAt:{
    type: Date,
    default: Date.now,
  },
}, {versionKey: false});

userSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

const user = mongoose.model("users", userSchema);

export default user;



