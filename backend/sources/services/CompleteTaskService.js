import * as Yup from "yup";
import AppError from "../errors/AppError";
import connection from "../database/connection";

class CompleteTaskService {

    async execute ({ taskId, userId }) { // Método responsável por concluir uma tarefa.

        const schema = Yup.object({
            taskId: Yup.number().integer().positive().required(),
            userId: Yup.number().integer().positive().required()
        });

        const validateData = await schema.validate({ taskId, userId });

        const [taskExists] = await connection.execute(
            `SELECT 
                id 
            FROM tasks WHERE id = ?`, [validateData.taskId]
        );

        if (taskExists.length === 0) {
            throw new AppError(
                "Tarefa não encontrada!",
                404,
                "TASK_NOT_FOUND"
            );
        }

        const [taskUpdate] = await connection.execute( // Executa a consulta para atualizar a tarefa como concluída no banco de dados.
            `UPDATE tasks
            SET 
                status = 'completed',
                completed_by = ?,
                completed_at = CURRENT_TIMESTAMP
            WHERE id = ?`, [validateData.userId, validateData.taskId]                    
        );

        if (taskUpdate.affectedRows === 0) {
            throw new AppError(
                "Erro ao completar a tarefa!",
                500,
                "INTERNAL_SERVER_ERROR"
            );
        }

        const [taskCompleted] = await connection.execute( // Executa a consulta para buscar os dados atualizados da tarefa após a conclusão.
            `SELECT
                tasks.id,
                tasks.task,
                tasks.status,
                DATE_FORMAT(tasks.completed_at, '%d/%m/%Y - %H:%i') AS completed_at,
                users.name AS completed_by
            FROM tasks
            JOIN users
            ON tasks.completed_by = users.id
            WHERE tasks.id = ?;`, [validateData.taskId]

        );

        return taskCompleted[0]; // Retorna os dados da tarefa que foi concluída.

    }

}

export default new CompleteTaskService();