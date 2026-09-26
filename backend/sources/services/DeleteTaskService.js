import connection from "../database/connection";

class DeleteTaskService {

    async execute() { // Método responsável por remover do banco de dados todas as tarefas concluídas.

        const [deleteTask] = await connection.execute(
            `DELETE FROM tasks
            WHERE status = 'completed';`
        );

    }

}

export default new DeleteTaskService();