import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
//import { config } from "dotenv";
import cors from "cors";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
})

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})

const app = express();

const corsOptions = {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    maxAge: 3600, // Cache por 1 hora
  };
  
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


routes(app);

export default app;