import mongoose from "mongoose";
import { skillSchema } from "../models/skillModel.js";
import conectaNaDatabase from "./dbConnect.js";
import "dotenv/config";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
})

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})

const Skills = mongoose.model('skills', skillSchema);

const skills = [
  { id: 1, nome: 'PHP',  },
  { id: 2,nome: 'JavaScript'},
  { id: 3,nome: 'Python'},
  { id: 4,nome: 'Java'},
  { id: 5,nome: 'HTML'},
  { id: 6,nome: 'CSS'},
  { id: 7,nome: 'React'},
  { id: 8,nome: 'Node.js'},
  { id: 9,nome: 'SQL'},
  { id: 10,nome: 'Git'}
];

const insertskills = async () => {
  try {
    const result = await Skills.insertMany(skills);
    console.log(`Dados inseridos com sucesso: ${result.length} documentos inseridos.`);
  } catch (err) {
    console.error('Erro ao inserir dados', err);
  }
};

insertskills();