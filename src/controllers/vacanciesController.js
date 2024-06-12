import validator from "validator";
import {vacancies} from "../models/vacanciesModel.js";
import CompanyModel from "../models/companyModel.js";
import { httpStatusCodes } from "../responseHandlers/statusCodes.js";
import jwt from "jsonwebtoken";
import getToken from "../utils/getToken.js";

class VacanciesController {

    static async getVacanciesByToken (req,res){
        try{
            const token = req.params.token;

            if(!token) {
                return res.status(httpStatusCodes.ERROR).json({ message: `Não autenticado`});
            }
    
            const {id: _id} = jwt.decode(token)

            const company = await CompanyModel.findOne({_id});

            if(!vacancies) {
                return res.status(httpStatusCodes.NOT_FOUND).json({ message: `Não encontrado`});
            }

            return res.status(httpStatusCodes.OK).json(company.vacancies);
        }catch (erro) {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na requisição do vacancies`});
        }
    };

    static async getVacancieByID (req,res){
        try{
            const token = req.params.token;
            const idVacancie = req.params._id;

            if(!token) {
                return res.status(httpStatusCodes.ERROR).json({ message: `Não autenticado`});
            }
    
            const {id: _id} = jwt.decode(token)

            const vacancie = await CompanyModel.findOne({_id, idVacancie: idVacancie});

            if(!vacancie) {
                return res.status(httpStatusCodes.NOT_FOUND).json({ message: `Não encontrado`});
            }

            return res.status(httpStatusCodes.OK).json(vacancie);
        }catch (erro) {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na requisição do vacancies`});
        }
    };

    static async createVacancies (req, res) {
        const vacancies = req.body;
        try{
            await VacanciesModel.create(vacancies)
            res.status(httpStatusCodes.CREATED).json({ message: "Vaga criado com sucesso"});
        }catch (erro){
            res.status(httpStatusCodes.INVALID_DATA).json({message: `${erro.message ?? erro} - falha ao cadastra vacancies`});
        }
    };


    static async updateVacancies (req,res){
        try{
            const token = req.params.token;
            const idVacancie = req.params._id;
            const vacancie = req.body;

            if(!token){
                res.status(httpStatusCodes.ERROR).json({ message: "Não autenticado"});
            }
            
            await VacanciesModel.findByIdAndUpdate(id, vacancie);

            const {id: vacanciesId, name, email} = await VacanciesModel.findById({_id: idVacancie});
            const resposta = { 
                id: vacanciesId, name, email
            }

            res.status(200).json({message: "Usuário atualizado com sucesso.", vacancies: resposta});
        }catch (erro) {
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na atualização`});
        }
    };

    static async deleteVacanciesById (req,res){
        try{
            const token = req.params.token;
            const idVacancie = req.params._id;
            
            
            await VacanciesModel.findByIdAndDelete({_id: idVacancie});

            if(!token){
                res.status(httpStatusCodes.ERROR).json({ message: "Não autenticado"});
            }
            res.status(200).json({message: "Usuário removido com sucesso"});
        }catch (erro) {
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na exclusão`});
        }
    };

};

export default VacanciesController;