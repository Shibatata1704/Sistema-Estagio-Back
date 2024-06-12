import SkillModel from "../models/skillsModel.js";


class SkillsController {

    static async getSkills (req,res){
        try{
            const skills = await SkillModel.find({});
            res.status(200).json(skills);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    };
};

export default skillsController;