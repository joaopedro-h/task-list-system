import * as Yup from "yup";
import AppError from "../errors/AppError";
import connection from "../database/connection";

class ReopenTaskService {

    async execute ({ taskId }) {

        const schema = Yup.object({
            taskId: Yup.number().integer().positive().required()
        });

        const validateData = await schema.validate({ taskId });

        const [reopenTask] = await connection.execute(
            `UPDATE tasks
            SET 
                status = 'pending'
            WHERE id = ?`, [validateData.taskId]
        );

        if (reopenTask.affectedRows === 0) {
            throw new AppError(
                "Erro ao reabrir a tarefa!",
                500,
                "INTERNAL_SERVER_ERROR"
            );
        }

    }

}

export default new ReopenTaskService();