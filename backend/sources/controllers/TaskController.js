import CreateTaskService from "../services/CreateTaskService";
import LoadTaskService from "../services/LoadTaskService";

class TaskController {

    async store (req, res) { // Método responsável por realizar o cadastro de uma nova tarefa.

        const { task } = req.body; // Pega a tarefa enviada pelo usuário na requisição pelo frontend.
        const userId = req.userId; // Pega o ID do usuário autenticado que foi adicionado na requisição pelo middleware de autenticação.

        try {

            const newTask = await CreateTaskService.execute({ // Executa o serviço responsável por realizar o cadastro da nova tarefa. (CreateTaskService.js)
                task,
                userId
            });

            return res.status(201).json(newTask); // Retorna os dados da tarefa após o cadastro ser realizado com sucesso.

        } catch (error) {

            return res.status(400).json({ // Retorna uma resposta informando que ocorreu uma falha durante o cadastro da tarefa.
                error: error.message
            });

        }

    }


    async index (req, res) {
     
        try {
            
            const tasks = await LoadTaskService.execute();

            return res.status(200).json(tasks);

        } catch (error) {
            
            return res.status(400).json({ // Retorna uma resposta informando que ocorreu uma falha durante a busca das tarefas.
                error: error.message
            });            

        }

    }

}

export default new TaskController();