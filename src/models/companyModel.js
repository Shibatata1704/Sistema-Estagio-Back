import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { vacanciesSchema } from "./vacanciesModel.js";

const companySchema = new mongoose.Schema({
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
  ramo:{
    type: String,
    required: true,
  },
  descricao:{
    type: String,
    required: true,
  },
  tipo: {
    type: String,
  },
  vaga: [vacanciesSchema],
  createdAt:{
    type: Date,
    default: Date.now,
  },
});

companySchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

const company = mongoose.model("company", companySchema);

export default company;



