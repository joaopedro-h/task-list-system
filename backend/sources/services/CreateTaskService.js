import connection from "../database/connection";

class CreateTaskService {

    async execute ({ task, userId}){
        
        const [result] = await connection.execute(
        `INSERT INTO tasks (task, created_by)
        VALUES (?,?)`, [task, userId]
        )

        return {
            id: result.insertId,
            task: task
        };

    }

}

export default new CreateTaskService();