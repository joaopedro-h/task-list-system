import * as Yup from "yup";
import connection from "../database/connection";
import encryptPassword from "../utils/encryptPassword";

class CreateUserService {

    async execute({ email, password }) { // Método responsável por realizar o cadastro do usuário.

        const schema = Yup.object().shape({ // Cria um schema para validar os dados enviados pelo usuário.
            email: Yup.string().email().required(), // Verifica se o email é uma string, possui formato válido e foi informado.
            password: Yup.string().required().min(6), // Verifica se a senha é uma string, foi informada e possui no mínimo 6 caracteres.
        })

        if (!(await schema.isValid({email, password}))) { // Verifica se os dados enviados pelo usuário estão de acordo com o schema.
            throw new Error("Dados inválidos!");  
        }

        const [emailExists] = await connection.execute( // Executa a consulta para verificar se o email já está cadastrado.
            `SELECT * FROM users
            WHERE email = ?`, [email]
        );

        if (emailExists.length > 0) { // Verifica se já existe um usuário cadastrado com o email informado.
            throw new Error("Email já em uso por outro usuário!");
        }

        const hashPassword = await encryptPassword(password); // Criptografa a senha informada pelo usuário antes de armazená-la no banco de dados.

        const [createUserResult] = await connection.execute( // Executa a consulta para cadastrar o novo usuário.
            `INSERT INTO users (email, password)
            VALUES (?,?)`, [email, hashPassword]);

        return { // Retorna os dados do usuário após o cadastro ser realizado com sucesso.
            id: createUserResult.insertId,
            email
        };

    }

}

export default new CreateUserService();