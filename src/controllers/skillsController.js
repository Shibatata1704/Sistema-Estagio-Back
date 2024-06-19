import {skills} from "../models/skillModel.js";


class SkillsController {

    static async getSkills (req,res){
        try{
            const Skills = await skills.find({});
            res.status(200).json(Skills);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    };
};

export default SkillsController;