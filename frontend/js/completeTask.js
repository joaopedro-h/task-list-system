async function completeTask() { // Função responsável por concluir uma tarefa.

    const completeButtons = document.querySelectorAll(".complete-button"); // Pega todos os botões responsáveis por concluir as tarefas.

    completeButtons.forEach(button => { // Percorre todos os botões de conclusão encontrados.

        button.addEventListener("click", async () => { // Adiciona o evento de clique em cada botão de conclusão.

            const taskId = button.dataset.taskId; // Pega o ID da tarefa armazenado no botão através do "data-task-id".

            const token = localStorage.getItem("token"); // Pega o token do usuário armazenado no "localStorage".

            const API_URL = "https://task-list-system-api.onrender.com";

            const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, { // Envia a requisição para concluir a tarefa utilizando o ID na rota.

                method: "PUT", // Define o método PUT para atualizar os dados da tarefa.

                headers: {

                    "Authorization": `Bearer ${token}` // Envia o token no cabeçalho da requisição para validar o usuário.

                }

            });

            const data = await response.json(); // Converte a resposta JSON recebida do backend para um objeto JavaScript.

            if (response.ok) { // Verifica se a conclusão da tarefa foi realizada com sucesso.

                await loadTasks(); // Carrega novamente as tarefas para atualizar a lista após a conclusão.

            }

        });

    });

}