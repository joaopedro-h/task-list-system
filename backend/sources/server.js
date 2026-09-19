import app from "./app"; // Importa o server que foi exportado pelo app.js.

const port = process.env.PORT || 3333;

app.listen(port); // Inicia o servidor na porta 3333.