import * as Yup from "yup";
import AppError from "../errors/AppError";
import connection from "../database/connection";

class EditTaskService {

    async execute ({ userId, taskId, taskName }) { // Método responsável editar a tarefa no banco de dados.

        const schema = Yup.object({ // Utiliza o Yup para validar os dados enviados pelo front-end.
            userId: Yup.number().integer().positive().required(),
            taskId: Yup.number().integer().positive().required(),
            taskName: Yup.string().trim().required().max(255)
        });

        const validateData = await schema.validate({ userId, taskId, taskName }); // Caso a validação falhe é retornado um erro, no qual será tratado no middleware responsável.

        const [taskUpdate] = await connection.execute( // Executa a edição da tarefa no banco de dados, usando o ID para identificar a tarefa.
            `UPDATE tasks
            SET task = ?
            WHERE id = ?
            AND created_by = ?`, [validateData.taskName, validateData.taskId, validateData.userId]
        ); 

        if (taskUpdate.affectedRows === 0) { // Retorna uma mensagem informando que ocorreu um erro durante a edição da tarefa.
            throw new AppError(
                "Apenas o criador pode editar esta tarefa.",
                403,
                "TASK_EDIT_FORBIDDEN"
            );
        }

        return taskUpdate;

    }

}

export default new EditTaskService();

