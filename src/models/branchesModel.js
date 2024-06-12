import mongoose from "mongoose";

const branchesSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
});

const branches = mongoose.model("branchess", branchesSchema);

export {branches, branchesSchema};



