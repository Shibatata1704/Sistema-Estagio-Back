import auth from "./authRoutes.js"
import user from "./userRoutes.js"
import register from "./registerRoutes.js"
import vacancies from "./vacanciensRoutes.js";
import branches from "./branchesRoute.js";
import skills from "./skillsRoutes.js";


const routes = (app) => {
    app.route("/").get((req,res) => res.status(200).send("Curso de Node,js"));

    app.use("/", auth) 
    app.use("/usuario", user)
    app.use("/usuarios", register)
    app.use("/vagas", vacancies)
    app.use("/ramos", branches)
    app.use("/competencias", skills)
}

export default routes;