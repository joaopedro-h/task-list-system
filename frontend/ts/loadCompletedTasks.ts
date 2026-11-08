const completedTasksButton = document.getElementById('completedTasksButton') as HTMLButtonElement;

completedTasksButton.addEventListener("click", async () => {

    currentView = "completed"; // Atualiza a visualização atual para tarefas concluídas.
    await refreshCurrentView(); // Atualiza a lista de tarefas de acordo com a visualização selecionada.

});

async function loadCompletedTasks(): Promise<void> {
    
    const token: string | null = localStorage.getItem("token"); // Pega o token do usuário armazenado no navegador.

    const API_URL: string = "https://task-list-system-api.onrender.com";

    const response: Response = await fetch(`${API_URL}/tasks`, { // Envia uma requisição ao backend para buscar todas as tarefas.
        
        method: "GET", // Define o método GET para buscar as tarefas.

        headers: {
            "Authorization": `Bearer ${token}` // Envia o token para validar o usuário autenticado.
        }

    });

    interface Task { // Define a estrutura dos dados de cada tarefa retornada pelo backend.
        id: number;
        task: string;
        status: string;
        user_name: string;
        created_at: string;
        started_by: string | null;
        started_at: string | null;
        completed_by: string | null;
        completed_at: string | null;
    }

    const tasks: Task[] = await response.json(); // Converte a resposta JSON recebida do backend para um array JavaScript.

    if (response.status === 404) { // Verifica se nenhuma tarefa foi encontrada.

        taskList.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>"; // Exibe uma mensagem informando que não existem tarefas cadastradas.
        return;

    } else if (response.status === 401){

        sessionExpired(); // Exibe o aviso informando que a sessão do usuário expirou.
        return;

    }

    const completedTasks = tasks.filter(task => task.status === "completed"); // Filtra apenas as tarefas que estão concluídas.

    if (completedTasks.length === 0) { // Verifica se existem tarefas concluídas.
        taskList.innerHTML = "<p>Nenhuma tarefa concluída.</p>";
        return;
    }

    taskList.innerHTML = ""; // Limpa a lista atual antes de exibir novamente as tarefas.

    completedTasks.forEach(task => { // Percorre todas as tarefas retornadas pelo backend.

        const taskCard = document.createElement("article"); // Cria um novo card para cada tarefa.

        taskCard.classList.add("task-card", "task-card-completed");

            taskCard.innerHTML = `
                <div class="task-card-main">

                    <div class="task-card-heading">

                        <h3>${task.task}</h3>

                        <p class="task-status completed">
                            Concluída ✓
                        </p>

                    </div>

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

                </div>

                <div class="completion-info">

                    <p>
                        <strong>Concluída por:</strong>
                        ${task.completed_by}
                        <span class="completion-separator">·</span>
                        ${task.completed_at}
                    </p>

                </div>
            `;

        taskList.appendChild(taskCard); // Adiciona o card criado na lista de tarefas.

    });

}