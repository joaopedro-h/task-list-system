import CreateTaskService from "../services/CreateTaskService";
import LoadTaskService from "../services/LoadTaskService";
import CompleteTaskService from "../services/CompleteTaskService";
import SearchTaskService from "../services/SearchTaskService";
import EditTaskService from "../services/EditTaskService";

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


    async index (req, res) { // Método responsável por buscar e exibir as tarefa.
     
        try {
            
            const tasks = await LoadTaskService.execute(); // Executa o serviço responsável por buscar as tarefas cadastradas no banco de dados. (LoadTaskService.js)

            return res.status(200).json(tasks); // Retorna as tarefas encontradas após a busca ser realizada com sucesso.

        } catch (error) {
            
            return res.status(404).json({ // Retorna uma resposta informando que ocorreu uma falha durante a busca das tarefas.
                error: error.message
            });            

        }

    }


    async complete (req, res) { // Método responsável por concluir uma tarefa.

        const taskId = req.params.id; // Pega o ID da tarefa enviado como parâmetro na rota da requisição.
        const userId = req.userId; // Pega o ID do usuário autenticado que foi adicionado na requisição pelo middleware de autenticação.

        try {
            
            const taskComplete = await CompleteTaskService.execute({ // Executa o serviço responsável por realizar a conclusão da tarefa. (CompleteTaskService.js)
                taskId,
                userId
            });

            return res.status(200).json(taskComplete); // Retorna os dados da tarefa após ela ser concluída com sucesso.

        } catch (error) {

            return res.status(400).json({  // Retorna uma resposta informando que ocorreu uma falha durante a conclusão da tarefa.
                error: error.message
            });

        }
        
    }


    async show (req, res) { // Método responsável por pesquisar uma tarefa.

        const taskName = req.params.name; // Pega o nome da tarefa enviado como parâmetro na rota da requisição.

        try {
            
            const taskFound = await SearchTaskService.execute({ // Executa o serviço responsável por realizar a busca da tarefa. (SearchTaskService.js)
                taskName
            });
    
            return res.status(200).json(taskFound); // Retorna os dados da tarefa encontrada após a busca ser realizada com sucesso.

        } catch (error) {
            
            return res.status(404).json({ // Retorna uma resposta informando que nenhuma tarefa foi encontrada durante a busca.
                error: error.message
            });

        }

    }


    async update (req, res) {

        console.log("chegou no controller");
        

        const taskId = req.params.id;
        const taskName  = req.body.task;

        try {
            
            const taskUpdated = await EditTaskService.execute({
                taskId,
                taskName
            });

            return res.json(200).json(taskUpdated);

        } catch (error) {

            return res.json(400).json({
                error: error.message
            });

        }

    }
}

export default new TaskController();