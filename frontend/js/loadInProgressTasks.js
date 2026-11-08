"use strict";
const inProgressTasksButton = document.getElementById('inProgressTasksButton'); // Pega o botão responsável por exibir as tarefas em andamento.
inProgressTasksButton.addEventListener("click", async () => {
    currentView = "in_progress"; // Atualiza a visualização atual para tarefas em andamento.
    await refreshCurrentView(); // Atualiza a lista de tarefas de acordo com a visualização selecionada.
});
async function loadInProgressTasks() {
    const token = localStorage.getItem("token"); // Pega o token do usuário armazenado no navegador.
    const API_URL = "https://task-list-system-api.onrender.com";
    const response = await fetch(`${API_URL}/tasks`, {
        method: "GET", // Define o método GET para buscar as tarefas.
        headers: {
            "Authorization": `Bearer ${token}` // Envia o token para validar o usuário autenticado.
        }
    });
    const tasks = await response.json(); // Converte a resposta JSON recebida do backend para um array JavaScript.
    if (response.status === 404) { // Verifica se nenhuma tarefa foi encontrada.
        taskList.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>"; // Exibe uma mensagem informando que não existem tarefas cadastradas.
        return;
    }
    else if (response.status === 401) { // Verifica se a sessão do usuário expirou.
        sessionExpired(); // Exibe o aviso informando que a sessão do usuário expirou.
        return;
    }
    const inProgressTasks = tasks.filter(task => task.status === "in_progress"); // Filtra apenas as tarefas que estão em andamento.
    if (inProgressTasks.length === 0) { // Verifica se existem tarefas em andamento.
        taskList.innerHTML = "<p>Nenhuma tarefa em andamento.</p>";
        return;
    }
    taskList.innerHTML = ""; // Limpa a lista atual antes de exibir novamente as tarefas.
    inProgressTasks.forEach(task => {
        const taskCard = document.createElement("article"); // Cria um novo card para cada tarefa.
        taskCard.classList.add("task-card", "task-card-progress");
        taskCard.innerHTML = `
            <div class="task-card-main">

                <div class="task-card-heading">

                    <h3>${task.task}</h3>

                    <p class="task-status progress">
                        Em andamento
                    </p>

                </div>

                <div class="task-card-details">

                    <div class="task-content">

                        <p>
                            <strong>Responsável:</strong>
                            ${task.user_name}
                        </p>

                        <p>
                            <strong>Criada:</strong>
                            ${task.created_at}
                        </p>

                    </div>

                    <div class="task-buttons">

                        <button
                            type="button"
                            class="reopen-button"
                            data-task-id="${task.id}"
                        >
                            Pendenciar
                        </button>

                        <button
                            type="button"
                            class="complete-button"
                            data-task-id="${task.id}"
                        >
                            Concluir ✓
                        </button>

                    </div>

                </div>

            </div>

            <div class="completion-info">

                <p>
                    <strong>Iniciado por:</strong>
                    ${task.started_by}
                    <span class="completion-separator">·</span>
                    ${task.started_at}
                </p>

            </div>

        `;
        taskList.appendChild(taskCard); // Adiciona o card criado na lista de tarefas.
    });
    reopenTask(); // Adiciona os eventos responsáveis por retornar as tarefas para pendentes.
    completeTask(); // Adiciona os eventos responsáveis por concluir as tarefas.
}
