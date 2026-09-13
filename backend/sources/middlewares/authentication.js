import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

async function authMiddleware(req, res, next) { // Middleware responsável por validar o token de autenticação do usuário.

    const authHeader = req.headers.authorization; // Pega o token enviado pelo frontend através do cabeçalho "Authorization" da requisição.

    if (!authHeader) { // Verifica se o cabeçalho "Authorization" não foi enviado na requisição.

        return res.status(401).json({ // Retorna uma resposta informando que o token é inválido caso ele não tenha sido enviado.
            error: "Token inválido!"
        });

    }

    const [, token] = authHeader.split(" "); // Separa o "Bearer" do token utilizando o split e guarda somente o token na variável.

    try {

        const decoded = jwt.verify(token, authConfig.secret); // Verifica se o token é válido utilizando o secret e decodifica as informações armazenadas no payload.

        req.userId = decoded.id; // Pega o ID armazenado no payload do token e adiciona esse ID dentro da requisição para ser utilizado nas próximas etapas. "ex: (req.userId = 15)"

        return next(); // Confirma que a autenticação foi realizada com sucesso e passa a requisição para a próxima etapa.

    } catch (error) {

        return res.status(401).json({ // Retorna uma resposta informando que o token é inválido caso a validação falhe.
            error: "Token inválido!"
        });

    }

}

export default authMiddleware;