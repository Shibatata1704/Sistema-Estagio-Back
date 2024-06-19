import mongoose from "mongoose";


const branchesSchema = new mongoose.Schema({
  id:{
    type: Number,
  },
  nome: {
    type: String,
  },
  descricao: {
    type: String,
  },
},{ _id: false});

const branches = mongoose.model("branches", branchesSchema);

export {branches, branchesSchema};



