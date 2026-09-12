import * as Yup from "yup";
import connection from "../database/connection";
import encryptPassword from "../utils/encryptPassword";

class CreateUserService {

    async execute({ name, login, password }) { // Método responsável por realizar o cadastro do usuário.

        const schema = Yup.object().shape({ // Cria um schema para validar os dados enviados pelo usuário.
            name: Yup.string().required(), // Verifica se o nome é uma string, possui formato válido e foi informado.
            login: Yup.string().required(), // Verifica se o login é uma string, possui formato válido e foi informado.
            password: Yup.string().required().min(6), // Verifica se a senha é uma string, foi informada e possui no mínimo 6 caracteres.
        })

        if (!(await schema.isValid({name, login, password}))) { // Verifica se os dados enviados pelo usuário estão de acordo com o schema.
            throw new Error("Dados inválidos!");  
        }

        const [loginExists] = await connection.execute( // Executa a consulta para verificar se o login já está cadastrado.
            `SELECT * FROM users
            WHERE login = ?`, [login]
        );

        if (loginExists.length > 0) { // Verifica se já existe um usuário cadastrado com o login informado.
            throw new Error("Login já em uso por outro usuário!");
        }

        const hashPassword = await encryptPassword(password); // Criptografa a senha informada pelo usuário antes de armazená-la no banco de dados.

        const [createUserResult] = await connection.execute( // Executa a consulta para cadastrar o novo usuário.
            `INSERT INTO users (name, login, password)
            VALUES (?,?,?)`, [name, login, hashPassword]);

        return { // Retorna os dados do usuário após o cadastro ser realizado com sucesso.
            id: createUserResult.insertId,
            name,
            login
        };

    }

}

export default new CreateUserService();