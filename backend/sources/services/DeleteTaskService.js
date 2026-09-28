import connection from "../database/connection";

class DeleteTaskService {

    async execute() { // Método responsável por remover do banco de dados todas as tarefas concluídas.

        const [deleteTask] = await connection.execute( // Executa a remoção das tarefas concluídas no banco de dados.
            `DELETE FROM tasks
            WHERE status = 'completed';`
        );

    }

}

export default new DeleteTaskService();