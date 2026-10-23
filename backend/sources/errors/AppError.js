class AppError extends Error {

    constructor(message, statusCode, code = "APP_ERROR") {
        
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;

    }

}

export default AppError;