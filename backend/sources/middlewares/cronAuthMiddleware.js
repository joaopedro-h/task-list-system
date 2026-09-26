async function cronAuthMiddleware(req, res, next) { // Função responsável por validar a chave enviada pelo serviço de agendamento.
    
    const cronSecret = req.headers["cron-secret"]; // Pega a chave enviada no cabeçalho da requisição.

    if (cronSecret !== process.env.CRON_SECRET) { // Verifica se a chave recebida é diferente da chave armazenada nas variáveis de ambiente.
        
        return res.status(401).json({
            error: "Não autorizado!"
        });

    }

    return next(); // Passa para o TaskController caso a chave seja validada.

}

export default cronAuthMiddleware;