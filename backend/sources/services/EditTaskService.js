import connection from "../database/connection";

class EditTaskService {

    async execute ({ taskId, taskName }) {

        const [taskUpdate] = await connection.execute(
            `UPDATE tasks
            SET task = ?
            WHERE id = ?`, [taskName, taskId]
        );

        if (taskUpdate.affectedRows === 0) {
            throw new Error("Erro ao editar tarefa");
        }

        return taskUpdate;

    }

}

export default new EditTaskService();