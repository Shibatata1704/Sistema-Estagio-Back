import mongoose from "mongoose";
import { skillSchema } from "./skillModel.js";
import { branchesSchema } from "./branchesModel.js";

const vacanciesSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  experiencia: {
    type: Number,
    required: true,
  },
  salarioMin:{
    type: Number,
    required: true,
  },
  salarioMax:{
    type: Number,
  },
  ativo: {
    type: Boolean,
    required: true,
  },
  ramo_id:branchesSchema,
  competencias: skillSchema,
});

const vacancies = mongoose.model("vacanciess", vacanciesSchema);

export {vacancies, vacanciesSchema};



