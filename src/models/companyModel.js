import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password:{
    type: String,
    required: true,
  },
  ramo:{
    type: String,
  },
  descricao:{
    type: String,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
});

companySchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const company = mongoose.model("company", companySchema);

export default company;



