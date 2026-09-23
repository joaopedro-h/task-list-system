const taskList = document.getElementById('taskList'); // Pega o elemento do front-end onde as tarefas serão exibidas.

const pendingTasksButton = document.getElementById('pendingTasksButton');

pendingTasksButton.addEventListener("click", async () => {

    currentView = "pending";
    await refreshCurrentView();
    
});
    
async function loadTasks() { // Função responsável por buscar e exibir as tarefas cadastradas.
    
    const token = localStorage.getItem("token"); // Pega o token do usuário armazenado no navegador.

    const API_URL = "https://task-list-system-api.onrender.com";

    const response = await fetch(`${API_URL}/tasks`, { // Envia uma requisição ao backend para buscar todas as tarefas.
        
        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}` // Envia o token para validar o usuário autenticado.
        }

    });

    const tasks = await response.json(); // Converte a resposta JSON recebida do backend para um array JavaScript.
    
    if (response.status === 404) {

        taskList.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;

    } else if (response.status === 401){

        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.location.href = "../login.html"; // Remove a autenticação e redireciona o usuário para o login.
        return;

    }

    const pendingTasks = tasks.filter(task => task.status === "pending");

    if (pendingTasks.length === 0) {
        taskList.innerHTML = "<p>Nenhuma tarefa pendente.</p>";
        return;
    }

    taskList.innerHTML = ""; // Limpa a lista atual antes de exibir novamente as tarefas.

    pendingTasks.forEach(task => { // Percorre todas as tarefas retornadas pelo backend.

        const taskCard = document.createElement("article"); // Cria um novo card para cada tarefa.

        taskCard.classList.add("task-card");

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
                        class="edit-button"
                        data-task-id="${task.id}"
                        data-task-name="${task.task}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="complete-button"
                        data-task-id="${task.id}"
                    >
                        Concluir ✓
                    </button>

                </div>
            `;

        taskList.appendChild(taskCard); // Adiciona o card criado na lista de tarefas.

    });

    completeTask(); // Adiciona a ação de conclusão aos botões das tarefas pendentes.
    editTask();

}