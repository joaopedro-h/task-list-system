import {Router} from "express";
import RegisterController from "../controllers/RegisterController";
import LoginController from "../controllers/LoginController";
import TaskController from "../controllers/TaskController";
import authMiddleware from "../middlewares/authentication";

const routes = new Router(); // "routes" armazena o Router onde as rotas serão criadas.

routes.post("/register/user", RegisterController.store); // Cria a rota para cadastrar um usuário.

routes.post("/login/user", LoginController.store); // Cria a rota para o usuário realizar o login.

routes.post("/tasks", authMiddleware, TaskController.store); // Cria a rota para criar uma tarefa.

routes.get("/tasks", authMiddleware, TaskController.index); 

export default routes;