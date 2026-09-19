import 'dotenv/config'
import express from "express";
import cors from "cors";
import routes from "./routes/routes";

class App { // Classe para configurar o Express.

    constructor() {
        
        this.server = express(); // Cria o servidor do Express.

        // Chama as funções para configurar os middlewares e as rotas.
        this.middlewares();
        this.routes();
    }

    // Configura os middlewares.
    middlewares(){
        this.server.use(cors({
            origin: "https://task-list-system-1ewu.onrender.com",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));

        this.server.use(express.json());
    }

    // Configura as rotas.
    routes(){
        this.server.use(routes);
    }

}

export default new App().server; // Cria uma nova instância da classe "App" e exporta somente a propriedade server do Express.