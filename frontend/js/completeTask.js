"use strict";
function completeTask() {
    const completeButtons = document.querySelectorAll(".complete-button"); // Pega todos os botões responsáveis por concluir as tarefas.
    completeButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const taskId = Number(button.dataset.taskId); // Pega o ID da tarefa armazenado no botão através do "data-task-id".
            const token = localStorage.getItem("token"); // Pega o token do usuário armazenado no "localStorage".
            const API_URL = "https://task-list-system-api.onrender.com";
            const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
                method: "PUT", // Define o método PUT para atualizar os dados da tarefa.
                headers: {
                    "Authorization": `Bearer ${token}` // Envia o token no cabeçalho da requisição para validar o usuário.
                }
            });
            if (response.ok) { // Verifica se a conclusão da tarefa foi realizada com sucesso.
                await refreshCurrentView(); // Carrega novamente as tarefas para atualizar a lista após a conclusão.
            }
            else if (response.status === 401) {
                sessionExpired(); // Exibe o aviso informando que a sessão do usuário expirou.
                return;
            }
        });
    });
}
