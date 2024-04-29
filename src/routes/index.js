import auth from "./authRoutes.js"
import user from "./userRoutes.js"

const routes = (app) => {
    app.route("/").get((req,res) => res.status(200).send("Curso de Node,js"));

    app.use("/", auth) 
    app.use("/usuarios", user)   
}

export default routes;