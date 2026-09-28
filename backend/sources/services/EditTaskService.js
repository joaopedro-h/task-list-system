import connection from "../database/connection";

class EditTaskService {

    async execute ({ taskId, taskName }) { // Método responsável editar a tarefa no banco de dados.

        const [taskUpdate] = await connection.execute( // Executa a edição da tarefa no banco de dados, usando o ID para identificar a tarefa.
            `UPDATE tasks
            SET task = ?
            WHERE id = ?`, [taskName, taskId]
        );

        if (taskUpdate.affectedRows === 0) { // Retorna uma mensagem informando que ocorreu um erro durante a edição da tarefa.
            throw new Error("Erro ao editar tarefa");
        }

        return taskUpdate;

    }

}

export default new EditTaskService();