import connection from "../database/connection";

class LoadTaskService {

    async execute() {     

        const [resultTasks] = await connection.execute(
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
            ON tasks.completed_by = completed.id;`
        );
   
        return resultTasks;

    }

}

export default new LoadTaskService();