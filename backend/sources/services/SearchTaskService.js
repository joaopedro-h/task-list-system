import connection from "../database/connection";

class SearchTaskService {
 
    async execute ({ taskName }) { // Método responsável por pesquisar uma tarefa pelo nome informado.

        const [searchTask] = await connection.execute( // Executa a consulta para buscar as tarefas que possuem o nome pesquisado pelo usuário.
            `SELECT
                tasks.id,
                tasks.task,
                tasks.status,
                DATE_FORMAT(tasks.created_at, '%d/%m/%Y - %H:%i') AS created_at,
                creator.name AS user_name,
                completed.name AS completed_by,
                DATE_FORMAT(tasks.completed_at, '%d/%m/%Y - %H:%i') AS completed_at
            FROM tasks
            JOIN users AS creator
            ON tasks.created_by = creator.id
            LEFT JOIN users AS completed
            ON tasks.completed_by = completed.id
            WHERE task LIKE ?
            ORDER BY 
                CASE 
                    WHEN tasks.status = 'pending' THEN 0
                    WHEN tasks.status = 'completed' THEN 1
                END,
                tasks.created_at DESC;`, [`%${taskName}%`] // Utiliza o LIKE com "%" para permitir buscar tarefas que tenha o texto informado pelo usuário.
        );

        if (searchTask.length === 0) { // Verifica se nenhuma tarefa foi encontrada com o texto informado.
            throw new Error("Nenhuma tarefa encontrada!"); // Interrompe a execução e retorna um erro caso nenhuma tarefa seja encontrada.
        }
        
        return searchTask; // Retorna as tarefas encontradas após a busca ser realizada com sucesso.

    }

}

export default new SearchTaskService();