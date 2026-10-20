import * as Yup from "yup";
import connection from "../database/connection";

class CompleteTaskService {

    async execute ({ taskId, userId }) { // Método responsável por concluir uma tarefa.

        const schema = Yup.object({
            taskId: Yup.number().integer().positive().required(),
            userId: Yup.number().integer().positive().required()
        });

        if (!(await schema.isValid({ taskId, userId }))) {
            throw new Error("Dados inválidos!");
        }

        const [taskExists] = await connection.execute(
            `SELECT 
                id 
            FROM tasks WHERE id = ?`, [taskId]
        );

        if (taskExists.length === 0) {
            throw new Error("Tarefa não encontrada!");
        }

        await connection.execute( // Executa a consulta para atualizar a tarefa como concluída no banco de dados.
            `UPDATE tasks
            SET 
                status = 'completed',
                completed_by = ?,
                completed_at = CURRENT_TIMESTAMP
            WHERE id = ?`, [userId, taskId]                    
        );

        const [taskCompleted] = await connection.execute( // Executa a consulta para buscar os dados atualizados da tarefa após a conclusão.
            `SELECT
                tasks.id,
                tasks.task,
                tasks.status,
                DATE_FORMAT(tasks.completed_at, '%d/%m/%Y - %H:%i') AS completed_at,
                users.name AS completed_by
            FROM tasks
            JOIN users
            ON tasks.completed_by = users.id
            WHERE tasks.id = ?;`, [taskId]

        );

        return taskCompleted[0]; // Retorna os dados da tarefa que foi concluída.

    }

}

export default new CompleteTaskService();