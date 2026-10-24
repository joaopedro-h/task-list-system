import jwt from "jsonwebtoken";
import * as Yup from "yup";
import AppError from "../errors/AppError";
import connection from "../database/connection";
import decryptPasswrod from "../utils/decryptPassword";
import authConfig from "../config/auth";

class LoginUserService {

    async execute({ login, password }){ // Método responsável por realizar o login do usuário.

        const schema = Yup.object().shape({ // Cria um schema para validar os dados enviados pelo usuário.
            login: Yup.string().required(), // Verifica se o login é uma string, possui formato válido e foi informado.
            password: Yup.string().required().min(6), // Verifica se a senha é uma string, foi informada e possui no mínimo 6 caracteres.
        })

        const validateData = await schema.validate({ login, password});

        const [resultUser] = await connection.execute( // Executa a consulta para buscar o usuário pelo email.
            `SELECT * FROM users
            WHERE login = ?`, [validateData.login]
        );

        if (resultUser.length === 0) { // Verifica se nenhum usuário foi encontrado com o login informado.
            throw new AppError(
                "Nenhum usuário encontrado!",
                404,
                "USER_NOT_FOUND"
            );
        }

        const user = resultUser[0]; // Pega o primeiro usuário encontrado no resultado da consulta.

        const hashPassword = await decryptPasswrod(validateData.password, user); // Compara a senha informada com a senha armazenada no banco de dados.

        if (!hashPassword) { // Verifica se a senha informada está incorreta.
            throw new AppError(
                "Senha incorreta!",
                401,
                "INVALID_CREDENTIALS"
            ); 
        }

        return { // Retorna os dados do usuário após o login ser realizado com sucesso.
            id: user.id,
            name: user.name,
            login: user.login,
            token: jwt.sign({id: user.id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }),
        }
    }

}

export default new LoginUserService();