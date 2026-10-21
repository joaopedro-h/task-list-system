import connection from "../database/connection";

class ReopenTaskService {

    async execute ({ taskId }) {

        const schema = Yup.object({
            taskId: Yup.number().integer().positive().required()
        });

        const validateData = await schema.validate({ taskId });

        await connection.execute(
            `UPDATE tasks
            SET 
                status = 'pending'
            WHERE id = ?`, [validateData.taskId]
        );

    }

}

export default new ReopenTaskService();