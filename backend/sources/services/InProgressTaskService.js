import connection from "../database/connection";

class InProgressTaskService {

    async execute ({ taskId, userId}) {

        await connection.execute( // Executa a consulta para atualizar a tarefa como em andamento no banco de dados.
            `UPDATE tasks
            SET 
                status = 'in_progress',
                completed_by = ?,
                completed_at = CURRENT_TIMESTAMP
            WHERE id = ?`, [userId, taskId]                    
        );

        const [taskInProgress] = await connection.execute( // Executa a consulta para buscar os dados atualizados da tarefa após dar início.
            `SELECT
                tasks.id,
                tasks.task,
                tasks.status,
                DATE_FORMAT(tasks.completed_at, '%d/%m/%Y - %H:%i') AS completed_at,
                users.name AS completed_by
            FROM tasks
            JOIN users
            ON tasks.completed_by = users.id
            WHERE tasks.id = ?;`, [taskId]

        );

        return taskInProgress[0]; // Retorna os dados da tarefa que foi iniciada.

    }

}

export default new InProgressTaskService();