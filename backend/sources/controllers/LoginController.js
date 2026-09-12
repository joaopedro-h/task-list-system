import LoginUserService from "../services/LoginUserService";

class LoginController {

    async store(req, res) { // Método responsável por realizar o login do usuário.

        const { login, password } = req.body; // Pega o login e a senha enviados pelo usuário na requisição.

        try {

            const user = await LoginUserService.execute({ // Executa o serviço responsável por realizar o login do usuário. (LoginUserService.js)
                login,
                password
            })          
            
            return res.status(200).json(user); // Retorna os dados do usuário após o login ser realizado com sucesso (ID nome e login).

        } catch (error) {

            return res.status(400).json({ // Retorna uma resposta informando que ocorreu uma falha durante o login.
                error: error.message
            });

        }

    }

}

export default new LoginController();