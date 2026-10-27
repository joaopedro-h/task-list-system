import * as Yup from "yup";
import AppError from "../errors/AppError.js";

function errorHandler(err, req, res, next) { // Middleware responsável por centralizar o tratamento de erros da aplicação, o erro é recebido pelo parâmetro "err".
    
    if (err instanceof Yup.ValidationError) { // Verifica se o erro foi gerado por uma falha na validação do Yup e retorna o código HTTP (400) com a mensagem do erro.
        return res.status(400).json({
            error: err.message,
        });
    }

    if (err instanceof AppError) { // Verifica se o erro é uma instância de AppError e retorna o status HTTP, a mensagem do erro e o código definidos no erro personalizado.
        return res.status(err.statusCode).json({
            error: err.message,
            code: err.code,
        });
    }

    console.log(err);
    
    return res.status(500).json({ // Caso o erro seja por algum outro motivo é retornado o status HTTP (500) e uma mensagem que ocorreu um erro no servidor.
        error: "Erro interno do servidor!"
    });

}

export default errorHandler;