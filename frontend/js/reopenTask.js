"use strict";
function reopenTask() {
    const reopenButtons = document.querySelectorAll(".reopen-button"); // Pega todos os botões responsáveis por reabrir as tarefas.
    reopenButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const taskId = button.dataset.taskId; // Pega o ID da tarefa armazenado no botão através do "data-task-id".
            const token = localStorage.getItem("token"); // Pega o token do usuário armazenado no "localStorage".
            const API_URL = "https://task-list-system-api.onrender.com";
            const response = await fetch(`${API_URL}/tasks/${taskId}/reopen`, {
                method: "PUT", // Define o método PUT para atualizar o status da tarefa.
                headers: {
                    "Authorization": `Bearer ${token}` // Envia o token no cabeçalho da requisição para validar o usuário.
                }
            });
            if (response.ok) { // Verifica se a reabertura da tarefa foi realizada com sucesso.
                await refreshCurrentView(); // Carrega novamente as tarefas para atualizar a lista após a reabertura.
            }
            else if (response.status === 401) { // Verifica se a sessão do usuário expirou ou se o token é inválido.
                sessionExpired(); // Exibe o aviso informando que a sessão do usuário expirou.
                return;
            }
        });
    });
}
