import connection from "../database/connection";

class CreateTaskService {

    async execute ({ task, userId }) { // Método responsável por realizar o cadastro de uma nova tarefa.

        const [result] = await connection.execute( // Executa a consulta para cadastrar a nova tarefa no banco de dados.
        `INSERT INTO tasks (task, created_by)
        VALUES (?,?)`, [task, userId]
        );

        return { // Retorna os dados da tarefa após o cadastro ser realizado com sucesso.
            id: result.insertId, // Pega o ID gerado automaticamente para a nova tarefa.
            task: task // Retorna a tarefa cadastrada.
        };

    }

}

export default new CreateTaskService();