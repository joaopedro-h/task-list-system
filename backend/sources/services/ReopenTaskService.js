import connection from "../database/connection";

class ReopenTaskService {

    async execute ({ taskId }) {

        await connection.execute(
            `UPDATE tasks
            SET 
                status = 'pending'
            WHERE id = ?`, [taskId]
        );

    }

}

export default new ReopenTaskService();