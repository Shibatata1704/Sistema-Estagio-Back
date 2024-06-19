import validator from "validator";
import {Vacancies} from "../models/vacanciesModel.js";
import CompanyModel from "../models/companyModel.js";
import { httpStatusCodes } from "../responseHandlers/statusCodes.js";
import jwt from "jsonwebtoken";
import getToken from "../utils/getToken.js";

class VacanciesController {

    static async getVacanciesByToken (req,res){
        try{
            const token = getToken(req)

            if(!token) {
                return res.status(httpStatusCodes.ERROR).json({ message: `Não autenticado`});
            }
    
            const {id: _id} = jwt.decode(token)

            const company = await CompanyModel.findOne({_id});
            if(!company){
                const vagas = await Vacancies.find({ativo: true})
                return res.status(httpStatusCodes.OK).json(vagas);
            }

            return res.status(httpStatusCodes.OK).json(company.vaga);
        }catch (erro) {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na requisição do vacancies`});
        }
    };

    static async getVacancieByID (req,res){
        try{
            const token = getToken(req)
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
        try{
            const token = getToken(req)
            const vacancieData = req.body;
            vacancieData.ativo = true

            if(!token) {
            return res.status(httpStatusCodes.ERROR).json({ message: `Não autenticado`});
            }
            
            const vacancie = await Vacancies.create(vacancieData)

            const {id: _id} = jwt.decode(token)
            const user = await CompanyModel.findByIdAndUpdate(
                _id,
                { $push: { vaga: vacancie } },
                { new: true }
            );
            res.status(httpStatusCodes.CREATED).json({ message: "Vaga criado com sucesso", user});
        }catch (erro){
            res.status(httpStatusCodes.INVALID_DATA).json({message: `${erro.message ?? erro} - falha ao cadastra vacancies`});
        }
    };


    static async updateVacancies (req,res){
        try{
            const token = getToken(req)
            const vacancieData = req.body;
            const idVacancie = req.params.id;
            
            const { id: _id } = jwt.decode(token);

            if(!token){
                res.status(httpStatusCodes.ERROR).json({ message: "Não autenticado"});
            }
            
            const updatedVacancy = await Vacancies.findByIdAndUpdate(idVacancie, vacancieData, { new: true, runValidators: true });
            const company = await CompanyModel.findOne({ _id: _id });

            // Atualizar a referência da vaga na empresa
            const index = company.vaga.findIndex(v => v.equals(idVacancie));
            if (index !== -1) {
                company.vaga[index] = updatedVacancy;
            }
    
            await company.save();
            res.status(200).json({message: "Usuário atualizado com sucesso.", Vacancies: updatedVacancy});
        }catch (erro) {
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na atualização`});
        }
    };

    static async deleteVacanciesById (req,res){
        try{
            const token = getToken(req)

            const { id: _id } = jwt.decode(token);
            if(!token){
                res.status(httpStatusCodes.ERROR).json({ message: "Não autenticado"});
            }

            const idVacancie = req.params.id;
            
            const vacancie = await Vacancies.findByIdAndDelete(idVacancie);
            await CompanyModel.findByIdAndUpdate(
                _id,
                { $pull: { vaga: vacancie } }
            );
            res.status(200).json({message: "Usuário removido com sucesso"});
        }catch (erro) {
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: `${erro.message} - falha na exclusão`});
        }
    };

};

export default VacanciesController;