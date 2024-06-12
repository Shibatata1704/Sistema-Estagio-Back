import UserModel from "../models/userModel.js"
import CompanyModel from "../models/companyModel.js"
import AuthModel from "../models/authModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { httpStatusCodes } from "../responseHandlers/statusCodes.js";
import getToken from "../utils/getToken.js";
import auth from "../models/authModel.js";



class AuthController {

    // escolho cadastro como usuario => pag de cadastro como usuario => insiro email e dados => chama o cadastro/candidato no back => guarda no banco user 
    // idem pra empresa 

    // login => 


    static async loginUser (req,res){
        const {email, senha} = req.body;
        try{
            if(!validator.isEmail(email)) 
                return res.status(httpStatusCodes.INVALID_DATA).json({message: "E-mail invalido"});

            var user = await UserModel.findOne({email});
            if(!user){
                user = await CompanyModel.findOne({email});
            }
            
            if(!await bcrypt.compare(senha, user.senha)) {
                res.status(httpStatusCodes.ERROR).json({ message: "erro"});
            }

            const isUserLogged = await AuthModel.findOne({email});
            const token = jwt.sign({id: user._id}, process.env.SECRET ,{
                expiresIn: "1d",
            });


            user.senha = undefined;

            if(isUserLogged) {
                await AuthModel.updateOne({_id: isUserLogged._id}, {email, token})

            } else {
    
                await AuthModel.create({email, token})
            }

            res.send({
                token,
                id: user.id,
                // name: user.nome,
                // email: user.email
            });
        } catch(erro){
            res.status(httpStatusCodes.ERROR).json({ message: `${erro.message}`});
        }
    };

    static async logout (req,res){
        try{
            const token = getToken(req);

            if(!token) {
                res.status(httpStatusCodes.ERROR).json({ message: `Não autenticado`});
            }

            const user = await AuthModel.deleteOne({token});
           
            if(!user) {
                res.status(httpStatusCodes.ERROR).json({ message: `Não autenticado`});
            }

            res.status(httpStatusCodes.OK).json({ message: "sucesso"});;
        }catch(erro){
            res.status(httpStatusCodes.ERROR).json({ message: `${erro.message}`});
        }
    };

    static async checkWhitelist (req,res){
        try{
            const users = await AuthModel.find({});
            res.status(200).json(users);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    };
};

export default AuthController;
