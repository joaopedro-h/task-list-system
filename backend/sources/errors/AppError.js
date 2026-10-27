class AppError extends Error { // Classe responsável por criar erros personalizados, herdando as funcionalidades nativas da classe Error, como message e etc.

    constructor(message, statusCode, code = "APP_ERROR") { // Define os parâmetros que cada erro personalizado vai poder receber.
        
        super(message); // Chama o construtor da classe Error e define a mensagem do erro.

        this.name = "AppError"; // Define o nome do erro personalizado.
        this.statusCode = statusCode; // Armazena o código HTTP que corresponde ao erro.
        this.code = code; // Armazena o código identificador do erro ou utiliza "APP_ERROR" como padrão caso não seja inserido nenhum outro na criação.

    }

}

export default AppError; // Exporta a classe para que outros arquivos possam criar instâncias utilizando "new AppError".