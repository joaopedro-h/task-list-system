import * as Yup from "yup";
import AppError from "../errors/AppError";
import connection from "../database/connection";

class ReopenTaskService {

    async execute ({ taskId }) {

        const schema = Yup.object({ // Utiliza o Yup para validar os dados enviados pelo front-end.
            taskId: Yup.number().integer().positive().required()
        });

        const validateData = await schema.validate({ taskId }); // Caso a validação falhe é retornado um erro, no qual será tratado no middleware responsável.

        const [reopenTask] = await connection.execute( // Executa a consulta para atualizar a tarefa como pendente no banco de dados.
            `UPDATE tasks
            SET 
                status = 'pending'
            WHERE id = ?`, [validateData.taskId]
        );

        if (reopenTask.affectedRows === 0) { // Caso a consulta não altere nenhuma linha é retornado um erro com a mensagem correspondente. 
            throw new AppError(
                "Erro ao reabrir a tarefa!",
                500,
                "INTERNAL_SERVER_ERROR"
            );
        }

    }

}

export default new ReopenTaskService();