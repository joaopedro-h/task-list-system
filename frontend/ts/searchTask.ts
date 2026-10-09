const searchButton = document.getElementById('searchButton') as HTMLButtonElement; // Pega as informações necessárias do front-end para realizar a busca das tarefas.
const clearSearchButton = document.getElementById('clearSearchButton') as HTMLButtonElement;
const searchInput = document.getElementById("researchedTask") as HTMLInputElement;

searchButton.addEventListener("click", searchTask) // Executa a função de busca quando o usuário clicar no botão.

searchInput.addEventListener("keydown", function(event: KeyboardEvent): void { // Permite realizar a busca também ao pressionar a tecla Enter.
    
    if (event.key === "Enter") {
        searchTask();
    }
    
});

clearSearchButton.addEventListener("click", async () => { // Limpa o campo de pesquisa e volta a exibir todas as tarefas.

    searchInput.value = "";
    await refreshCurrentView();

});

const searchOverlay = document.getElementById('searchOverlay') as HTMLElement;
const searchMessageButton = document.getElementById('searchMessageButton') as HTMLButtonElement;

searchMessageButton.addEventListener("click", () => {
    searchInput.value = "";
    searchOverlay.style.display = "none";
});

async function searchTask(): Promise<void> { // Função responsável por realizar a busca de tarefas.

    const researchedTask: string = (document.getElementById('researchedTask') as HTMLInputElement).value; // Pega o valor inserido pelo usuário no campo de pesquisa.

    const token: string | null = localStorage.getItem("token"); // Pega o token do usuário armazenado no navegador.

    const API_URL: string = "https://task-list-system-api.onrender.com";

    const response: Response = await fetch(`${API_URL}/tasks/${encodeURIComponent(researchedTask)}/search`, {

        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}` // Envia o token para validar o usuário autenticado.
        },

    });

    interface Task {
        id: number;
        task: string;
        status: "pending" | "in_progress" | "completed";
        user_name: string;
        created_at: string;
        started_by: string | null;
        started_at: string | null;
        completed_by: string | null;
        completed_at: string | null;
    }

    const taskFound: Task[] = await response.json(); // Converte a resposta JSON recebida do backend para um objeto ou array JavaScript.

    if (response.status === 404) { // Verifica se ocorreu algum erro durante a busca.
        
        searchOverlay.style.display = "flex";
        return; // Interrompe a execução caso a busca não seja realizada com sucesso.

    } else if (response.status === 401){

        sessionExpired(); // Apaga o token e o nome de usuário salvos no navegador, remove a autenticação do usuário e retorna para a tela de login.
        return;

    }

    taskList.innerHTML = ""; // Limpa a lista atual antes de exibir somente as tarefas encontradas.

    taskFound.forEach(task => { // Percorre todas as tarefas encontradas na pesquisa.

        const taskCard = document.createElement("article"); // Cria um novo card para cada tarefa encontrada.

        taskCard.classList.add("task-card");

        if (task.status === "completed") { // Verifica se a tarefa encontrada está concluída para montar o card correspondente.

            taskCard.innerHTML = `
                <div class="task-content">

                    <h3>${task.task}</h3>

                    <p>
                        <strong>Responsável:</strong>
                        ${task.user_name}
                    </p>

                    <p>
                        <strong>Criada:</strong>
                        ${task.created_at}
                    </p>                  

                    <p class="task-status completed">
                        Concluída ✓
                    </p>

                    <div class="completion-info">

                        <p>
                            <strong>Concluída por:</strong>
                            ${task.completed_by}
                        </p>

                        <p>
                            <strong>Concluída:</strong>
                            ${task.completed_at}
                        </p>

                    </div>

                </div>
            `;

        } else if (task.status === "in_progress") { // Verifica se a tarefa encontrada está em andamento.

            taskCard.innerHTML = `
                <div class="task-content">

                    <h3>${task.task}</h3>

                    <p>
                        <strong>Responsável:</strong>
                        ${task.user_name}
                    </p>

                    <p>
                        <strong>Criada:</strong>
                        ${task.created_at}
                    </p>

                    <p class="task-status progress">
                        Em andamento
                    </p>

                    <div class="completion-info">

                        <p>
                            <strong>Iniciado por:</strong>
                            ${task.started_by}
                        </p>

                        <p>
                            <strong>Iniciado:</strong>
                            ${task.started_at}
                        </p>

                    </div>

                </div>

                <div class="task-buttons">

                    <button
                        type="button"
                        class="complete-button"
                        data-task-id="${task.id}"
                    >
                        Concluir ✓
                    </button>

                </div>
            `;

        } else { // Caso a tarefa encontrada ainda esteja pendente, monta o card com a opção de conclusão.

            taskCard.innerHTML = `
                <div class="task-content">

                    <h3>${task.task}</h3>

                    <p>
                        <strong>Responsável:</strong>
                        ${task.user_name}
                    </p>

                    <p>
                        <strong>Criada:</strong>
                        ${task.created_at}
                    </p>

                    <p class="task-status pending">
                        Pendente
                    </p>

                </div>

                <div class="task-buttons">

                    <button
                        type="button"
                        class="complete-button"
                        data-task-id="${task.id}"
                    >
                        Concluir ✓
                    </button>

                </div>
            `;

        }

        taskList.appendChild(taskCard); // Adiciona o card da tarefa encontrada na lista.

    });

    completeTask(); // Adiciona a ação de conclusão aos botões das tarefas pendentes encontradas.
    
}

