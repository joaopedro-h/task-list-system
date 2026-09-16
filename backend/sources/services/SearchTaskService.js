import connection from "../database/connection";

class SearchTaskService {
 
    async execute ({ taskName }) {

        const [searchTask] = await connection.execute(
            `SELECT
                tasks.id,
                tasks.task,
                tasks.status,
                DATE_FORMAT(tasks.created_at, '%d/%m/%Y - %H:%i') AS created_at,
                creator.name AS user_name,
                completed.name AS completed_by,
                DATE_FORMAT(tasks.completed_at, '%d/%m/%Y - %H:%i') AS completed_at
            FROM tasks
            JOIN users AS creator
            ON tasks.created_by = creator.id
            LEFT JOIN users AS completed
            ON tasks.completed_by = completed.id
            WHERE task LIKE ?
            ORDER BY 
                CASE 
                    WHEN tasks.status = 'pending' THEN 0
                    WHEN tasks.status = 'completed' THEN 1
                END,
                tasks.created_at DESC;`, [`%${taskName}%`]
        );

        if (searchTask.length === 0) {
            throw new Error("Nenhuma tarefa encontrada!");
        }
        
        return searchTask;

    }

}

export default new SearchTaskService();