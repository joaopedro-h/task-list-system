import connection from "../database/connection";

class DeleteTaskService {

    async execute() {

        const [deleteTask] = await connection.execute(
            `DELETE FROM tasks
            WHERE status = 'completed';`
        );

    }

}

export default new DeleteTaskService();