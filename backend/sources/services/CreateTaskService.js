import * as Yup from "yup";
import connection from "../database/connection";

class CreateTaskService {

    async execute ({ task, userId }) { // Método responsável por realizar o cadastro de uma nova tarefa.

        const schema = Yup.object({
            task: Yup.string().trim().required().max(255),
            userId: Yup.number().integer().positive().required()
        });

        const validateData = await schema.validate({ task, userId });

        const [result] = await connection.execute( // Executa a consulta para cadastrar a nova tarefa no banco de dados.
        `INSERT INTO tasks (task, created_by)
        VALUES (?,?)`, [validateData.task, validateData.userId]
        );

        return { // Retorna os dados da tarefa após o cadastro ser realizado com sucesso.
            id: result.insertId, // Pega o ID gerado automaticamente para a nova tarefa.
            task: validateData.task // Retorna a tarefa cadastrada.
        };

    }

}

export default new CreateTaskService();