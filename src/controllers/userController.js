import validator from "validator";
import UserModel from "../models/userModel.js";
import CompanyModel from "../models/companyModel.js";
import { httpStatusCodes } from "../responseHandlers/statusCodes.js";
import jwt from "jsonwebtoken";
import getToken from "../utils/getToken.js";

class UserController {

    static async getUsers (req,res){
        try{
            const users = await UserModel.find({});
            res.status(200).json(users);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    };

    static async getUserByToken (req,res){
        try{
            const token = getToken(req)

            if(!token) {
                return res.status(httpStatusCodes.ERROR).json({ message: `Não autenticado`});
            }
    
            const {id: _id} = jwt.decode(token)

            var user = await UserModel.findOne({_id});
            if(!user){
                user = await CompanyModel.findOne({_id});
            }

            if(!user) {
                return res.status(httpStatusCodes.NOT_FOUND).json({ message: `Não encontrado`});
            }
            
            return res.status(httpStatusCodes.OK).json(user);
        }catch (erro) {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na requisição do user`});
        }
    };

    static async getUserByEmail(req,res){
        try{
            const {email} = req.params;
            const user = await UserModel.findOne({email});

            res.status(200).json(user);
        }catch (erro) {
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na requisição do user`});
        }
    };

    static async createUser (req, res) {
        const user = req.body;
        user.tipo = "candidato"
        try{
            if(!validator.isEmail(user.email)) 
                return res.status(httpStatusCodes.INVALID_DATA).json({message: "E-mail invalido"});
            const {_id, nome, email} = await UserModel.create(user)

            const resposta = { 
                _id, nome, email
            }
            res.status(201).json({ message: "Usuario criado com sucesso", user: resposta});
        }catch (erro){
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: `${erro.message ?? erro} - falha ao cadastra user`});
        }
    };

    static async createCompany (req, res) {
        const company = req.body;
        company.tipo = "empresa"
        try{
            if(!validator.isEmail(company.email)) 
                return res.status(httpStatusCodes.INVALID_DATA).json({message: "E-mail invalido"});
            const {_id, nome, email} = await CompanyModel.create(company)

            const resposta = { 
                _id, nome, email
            }
            res.status(201).json({ message: "Usuario criado com sucesso", company: resposta});
        }catch (erro){
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({message: `${erro.message ?? erro} - falha ao cadastra company`});
        }
    };

    static async updateUser (req,res){
        try{
            const token = getToken(req)
            const dados = req.body
           
            if(!token){
                res.status(httpStatusCodes.ERROR).json({ message: "Não autenticado"});
            }
            
            const {id: _id} = jwt.decode(token)
            
            var user = await UserModel.findByIdAndUpdate(_id, dados);
            if(!user){
                user = await CompanyModel.findByIdAndUpdate(_id, dados);
            }

            res.status(200).json({message: "Usuário atualizado com sucesso."});
        }catch (erro) {
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na atualização`});
        }
    };

    static async deleteUserById (req,res){
        try{
            const token = getToken(req)

            if(!token) {
                return res.status(httpStatusCodes.ERROR).json({ message: `Não autenticado`});
            }

            const {id: _id} = jwt.decode(token)

            var user = await UserModel.findByIdAndDelete({_id});
            if(!user){
                user = await CompanyModel.findByIdAndDelete({_id});
            }

            res.status(200).json({message: "Usuário removido com sucesso"});
        }catch (erro) {
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na exclusão`});
        }
    };

    static async searchUser (req, res)  {
        const { competencias, experiencia } = req.body;
      
        try {
            experiencia
            User.find({ competencia :  competencias})
            .then(users => {
              // Handle found users
              console.log(users);
            })
      
          res.status(200).json(users);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

};

export default UserController;