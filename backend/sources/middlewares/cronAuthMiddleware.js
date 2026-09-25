async function cronAuthMiddleware(req, res, next) {
    
    const cronSecret = req.headers["cron-secret"];

    if (cronSecret !== process.env.CRON_SECRET) {
        
        return res.status(400).json({
            error: "Não autorizado!"
        });

    }

    return next();

}

export default cronAuthMiddleware;