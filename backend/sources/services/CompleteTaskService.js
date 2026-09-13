import connection from "../database/connection";

class CompleteTaskService {

    async execute ({ taskId, userId }) {

        await connection.execute(
            `UPDATE tasks
            SET 
                status = "completed",
                completed_by = ?,
                completed_at = CURRENT_TIMESTAMP
            WHERE id = ?`, [userId, taskId]                    
        );

        const [taskCompleted] = await connection.execute(
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

        return taskCompleted[0];

    }

}

export default new CompleteTaskService();