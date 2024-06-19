import mongoose from "mongoose";
import { branchesSchema } from "../models/branchesModel.js";
import conectaNaDatabase from "./dbConnect.js";
import "dotenv/config";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
})

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})

const Branches = mongoose.model('Branches', branchesSchema);

const branches = [
  { id: 1,nome: 'Desenvolvimento de Software', descricao: 'Responsável por projetar, desenvolver e manter aplicativos de software.' },
  { id: 2,nome: 'Administração de Redes', descricao: 'Responsável por gerenciar e manter redes de computadores dentro de uma organização.' },
  { id: 3,nome: 'Segurança Cibernética', descricao: 'Responsável por proteger sistemas de computadores, redes e dados contra ameaças cibernéticas.' },
  { id: 4,nome: 'Administração de Banco de Dados', descricao: 'Responsável por gerenciar e manter bancos de dados dentro de uma organização.' }
];

const insertbranches = async () => {
  try {
    const result = await Branches.insertMany(branches);
    console.log(`Dados inseridos com sucesso: ${result.length} documentos inseridos.`);
  } catch (err) {
    console.error('Erro ao inserir dados', err);
  }
};

insertbranches();