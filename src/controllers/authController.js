import userModel from "../models/userModel.js"
import authModel from "../models/authModel.js"
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
        const {email, password} = req.body;
        try{
            if(!validator.isEmail(email)) 
                return res.status(httpStatusCodes.INVALID_EMAIL).json({message: "E-mail invalido"});

            const user = await userModel.findOne({email});

            
            if(!await bcrypt.compare(password, user.password)) {
                res.status(httpStatusCodes.ERROR).json({ message: "erro"});
            }

            const isUserLogged = await authModel.findOne({email});
            const token = jwt.sign({id: user._id}, process.env.SECRET ,{
                expiresIn: "1d",
            });


            user.password = undefined;

            if(isUserLogged) {
                await authModel.updateOne({_id: isUserLogged._id}, {email, token})

            } else {
    
                await authModel.create({email, token})
            }

            res.send({
                token,
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

            const user = await authModel.deleteOne({token});
           
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
            const users = await authModel.find({});
            res.status(200).json(users);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    };
};

export default AuthController;
