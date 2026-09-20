import connection from "../database/connection";

class LoadTaskService {

    async execute() {     

        const [resultTasks] = await connection.execute(
            `SELECT
                tasks.id,
                tasks.task,
                tasks.status,
                DATE_FORMAT(CONVERT_TZ(tasks.created_at, '+00:00', '-03:00'),'%d/%m/%Y - %H:%i') AS created_at,
                creator.name AS user_name,
                completed.name AS completed_by,
                DATE_FORMAT(CONVERT_TZ(tasks.completed_at, '+00:00', '-03:00'),'%d/%m/%Y - %H:%i') AS completed_at
            FROM tasks
            JOIN users AS creator
            ON tasks.created_by = creator.id
            LEFT JOIN users AS completed
            ON tasks.completed_by = completed.id
            ORDER BY 
                CASE 
                    WHEN tasks.status = 'pending' THEN 0
                    WHEN tasks.status = 'completed' THEN 1
                END,
                tasks.created_at DESC;`
        );
        
        if (resultTasks.length === 0) {
            throw new Error("Nenhuma tarefa encontrada!");
        }

        return resultTasks;

    }

}

export default new LoadTaskService();