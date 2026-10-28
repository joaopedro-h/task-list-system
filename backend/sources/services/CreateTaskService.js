import * as Yup from "yup";
import AppError from "../errors/AppError";
import connection from "../database/connection";

class CreateTaskService {

    async execute ({ task, userId }) { // Método responsável por realizar o cadastro de uma nova tarefa.

        const schema = Yup.object({ // Utiliza o Yup para validar os dados enviados pelo front-end.
            task: Yup.string().trim().required().max(255),
            userId: Yup.number().integer().positive().required()
        });

        const validateData = await schema.validate({ task, userId }); // Caso a validação falhe é retornado um erro, no qual será tratado no middleware responsável.

        const [result] = await connection.execute( // Executa a consulta para cadastrar a nova tarefa no banco de dados.
        `INSERT INTO tasks (task, created_by)
        VALUES (?,?)`, [validateData.task, validateData.userId]
        );

        if (result.affectedRows === 0) {
            throw new AppError(
                "Erro ao criar tarefa!",
                500,
                "TASK_CREATE_FAILED"
            );
        }

        return { // Retorna os dados da tarefa após o cadastro ser realizado com sucesso.
            id: result.insertId, // Pega o ID gerado automaticamente para a nova tarefa.
            task: validateData.task // Retorna a tarefa cadastrada.
        };

    }

}

export default new CreateTaskService();