import CreateUserService from "../services/CreateUserService";

class RegisterController {

    async store(req, res){ // Método responsável por realizar o cadastro do usuário.

        const { name, login, password } = req.body; // Pega o email e a senha enviados pelo usuário na requisição.

        try {
            
            const user = await CreateUserService.execute({ // Executa o serviço responsável por realizar o cadastro do usuário. (CreateUserService.js)
                name,
                login, 
                password
            });

            return res.status(201).json(user); // Retorna os dados do usuário após o cadastro ser realizado com sucesso (ID e email).

        } catch (error) {
            
            return res.status(400).json({ // Retorna uma resposta informando que ocorreu uma falha durante o cadastro.
                error: error.message
            });

        }

    }
}

export default new RegisterController();