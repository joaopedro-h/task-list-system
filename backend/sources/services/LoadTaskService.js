import connection from "../database/connection";

class LoadTaskService {

    async execute() {     

        const [resultTasks] = await connection.execute(
            `SELECT
                tasks.id,
                tasks.task,
                tasks.status,
                DATE_FORMAT(tasks.created_at, '%d/%m/%Y - %H:%i') AS created_at,
                users.name AS user_name
            FROM tasks
            JOIN users
            ON tasks.created_by = users.id;`
        );

        return resultTasks;

    }

}

export default new LoadTaskService();