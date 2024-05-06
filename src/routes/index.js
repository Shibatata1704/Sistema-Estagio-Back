import auth from "./authRoutes.js"
import user from "./userRoutes.js"
import register from "./registerRoutes.js"

const routes = (app) => {
    app.route("/").get((req,res) => res.status(200).send("Curso de Node,js"));

    app.use("/", auth) 
    app.use("/usuarios", user)
    app.use("/usuario", register)
}

export default routes;