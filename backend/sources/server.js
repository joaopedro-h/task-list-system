import app from "./app"; // Importa o server que foi exportado pelo app.js.

const port = process.env.PORT || 3333; // Utiliza a porta fornecida pelo ambiente ou a porta 3333 caso ela não esteja definida.

app.listen(port); // Inicia o servidor na porta definida.