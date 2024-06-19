import {branches} from "../models/branchesModel.js";

class BranchesController {

    static async getBranches (req,res){
        try{
            const Branches = await branches.find({});
            res.status(200).json(Branches);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição`});
        }
    };
};

export default BranchesController;