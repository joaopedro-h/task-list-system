import connection from "../database/connection";

class EditTaskService {

    async execute ({ userId, taskId, taskName }) { // Método responsável editar a tarefa no banco de dados.

        const [taskUpdate] = await connection.execute( // Executa a edição da tarefa no banco de dados, usando o ID para identificar a tarefa.
            `UPDATE tasks
            SET task = ?
            WHERE id = ?
            AND created_by = ?`, [taskName, taskId, userId]
        ); 

        if (taskUpdate.affectedRows === 0) { // Retorna uma mensagem informando que ocorreu um erro durante a edição da tarefa.
            throw new Error("Apenas o criador pode editar esta tarefa.");
        }

        return taskUpdate;

    }

}

export default new EditTaskService();