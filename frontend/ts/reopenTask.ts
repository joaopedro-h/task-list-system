function reopenTask(): void { // Função responsável por reabrir uma tarefa iniciada.

    const reopenButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".reopen-button"); // Pega todos os botões responsáveis por reabrir as tarefas.

    reopenButtons.forEach(button => { // Percorre todos os botões de reabertura encontrados.

        button.addEventListener("click", async ()=> { // Adiciona o evento de clique em cada botão de reabertura.

            const taskId: string | undefined = button.dataset.taskId; // Pega o ID da tarefa armazenado no botão através do "data-task-id".

            const token: string | null = localStorage.getItem("token"); // Pega o token do usuário armazenado no "localStorage".

            const API_URL: string = "https://task-list-system-api.onrender.com";

            const response: Response = await fetch(`${API_URL}/tasks/${taskId}/reopen`, { // Envia a requisição para reabrir a tarefa utilizando o ID na rota.

                method: "PUT", // Define o método PUT para atualizar o status da tarefa.

                headers: {
                    "Authorization": `Bearer ${token}` // Envia o token no cabeçalho da requisição para validar o usuário.
                }

            });

            if (response.ok) { // Verifica se a reabertura da tarefa foi realizada com sucesso.

                await refreshCurrentView(); // Carrega novamente as tarefas para atualizar a lista após a reabertura.

            } else if(response.status === 401){ // Verifica se a sessão do usuário expirou ou se o token é inválido.

                sessionExpired(); // Exibe o aviso informando que a sessão do usuário expirou.
                return;

            }            

        });

    });

}