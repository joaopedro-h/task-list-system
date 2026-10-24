import * as Yup from "yup";
import AppError from "../errors/AppError";
import connection from "../database/connection";

class InProgressTaskService {

    async execute ({ taskId, userId}) {

        const schema = Yup.object({
            taskId: Yup.number().integer().positive().required(),
            userId: Yup.number().integer().positive().required()
        });

        const validateData = await schema.validate({ taskId, userId });

        const [taskProgress] = await connection.execute( // Executa a consulta para atualizar a tarefa como em andamento no banco de dados.
            `UPDATE tasks
            SET 
                status = 'in_progress',
                started_by = ?,
                started_at = CURRENT_TIMESTAMP
            WHERE id = ?`, [validateData.userId, validateData.taskId]                    
        );

        if (taskProgress.affectedRows === 0) {
            throw new AppError(
                "Erro ao iniciar a tarefa!",
                500,
                "INTERNAL_SERVER_ERROR"
            );
        }

        const [taskInProgress] = await connection.execute( // Executa a consulta para buscar os dados atualizados da tarefa após dar início.
            `SELECT
                tasks.id,
                tasks.task,
                tasks.status,
                DATE_FORMAT(
                CONVERT_TZ(tasks.started_at, '+00:00', '-03:00'),'%d/%m/%Y - %H:%i') AS started_at,
                users.name AS started_by
            FROM tasks
            JOIN users
            ON tasks.started_by = users.id
            WHERE tasks.id = ?;`, [validateData.taskId]

        );

        return taskInProgress[0]; // Retorna os dados da tarefa que foi iniciada.

    }

}

export default new InProgressTaskService();