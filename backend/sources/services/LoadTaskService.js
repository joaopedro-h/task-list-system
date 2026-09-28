import connection from "../database/connection";

class LoadTaskService {

    async execute() { // Método responsável por buscar no banco de dados as tarefas cadastradas.

        const [resultTasks] = await connection.execute( // Executa a consulta ao banco de dados.
            `SELECT
                tasks.id,
                tasks.task,
                tasks.status,
                DATE_FORMAT(CONVERT_TZ(tasks.created_at, '+00:00', '-03:00'),'%d/%m/%Y - %H:%i') AS created_at,
                creator.name AS user_name,
                completed.name AS completed_by,
                DATE_FORMAT(CONVERT_TZ(tasks.completed_at, '+00:00', '-03:00'),'%d/%m/%Y - %H:%i') AS completed_at
            FROM tasks
            JOIN users AS creator
            ON tasks.created_by = creator.id
            LEFT JOIN users AS completed
            ON tasks.completed_by = completed.id
            ORDER BY 
                CASE 
                    WHEN tasks.status = 'pending' THEN 0
                    WHEN tasks.status = 'completed' THEN 1
                END,
                tasks.created_at DESC;`
        );
        
        if (resultTasks.length === 0) { // Retorna uma mensagem de erro informando que não tme nenhuma tarefa cadastrada.
            throw new Error("Nenhuma tarefa encontrada!");
        }

        return resultTasks; // Retorna as tarefas encontradas.

    }

}

export default new LoadTaskService();