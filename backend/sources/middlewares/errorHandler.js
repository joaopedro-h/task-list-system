import * as Yup from "yup";
import AppError from "../errors/AppError.js";

function errorHandler(err, req, res, next) {
    
    if (err instanceof Yup.ValidationError) {
        return res.status(400).json({
            error: err.message,
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
            code: err.code,
        });
    }

    console.log(err);
    
    return res.status(500).json({
        error: "Erro interno do servidor!"
    });

}

export default errorHandler;