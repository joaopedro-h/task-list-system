import * as Yup from "yup";
import connection from "../database/connection";
import decryptPasswrod from "../utils/decryptPassword";

class LoginUserService {

    async execute({ email, password }){ // Método responsável por realizar o login do usuário.

        const schema = Yup.object().shape({ // Cria um schema para validar os dados enviados pelo usuário.
            email: Yup.string().email().required(), // Verifica se o email é uma string, possui formato válido e foi informado.
            password: Yup.string().required().min(6), // Verifica se a senha é uma string, foi informada e possui no mínimo 6 caracteres.
        })

        if (!(await schema.isValid({email, password}))) { // Verifica se os dados enviados pelo usuário estão de acordo com o schema.
            throw new Error("Dados inválidos!");  
        }

        const [resultUser] = await connection.execute( // Executa a consulta para buscar o usuário pelo email.
            `SELECT * FROM users
            WHERE email = ?`, [email]
        );

        if (resultUser.length === 0) { // Verifica se nenhum usuário foi encontrado com o email informado.
            throw new Error("Nenhum usuário encontrado!");
        }

        const user = resultUser[0]; // Pega o primeiro usuário encontrado no resultado da consulta.

        const hashPassword = await decryptPasswrod(password, user); // Compara a senha informada com a senha armazenada no banco de dados.

        if (!hashPassword) { // Verifica se a senha informada está incorreta.
            throw new Error("Senha incorreta!"); 
        }

        return { // Retorna os dados do usuário após o login ser realizado com sucesso.
            id: user.id,
            email: user.email
        }
    }

}

export default new LoginUserService();