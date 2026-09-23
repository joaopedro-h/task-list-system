const completedTasksButton = document.getElementById('completedTasksButton');

completedTasksButton.addEventListener("click", () => {
    currentView = "completed";
    loadCompletedTasks();
});

async function loadCompletedTasks() {
    
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

        taskList.innerHTML = "<p>Nenhuma tarefa concluída.</p>";
        return;

    } else if (response.status === 401){

        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.location.href = "../login.html"; // Remove a autenticação e redireciona o usuário para o login.
        return;

    }

    const completedTasks = tasks.filter(task => task.status === "completed");

    if (completedTasks.length === 0) {
        taskList.innerHTML = "<p>Nenhuma tarefa condluída.</p>";
        return;
    }

    taskList.innerHTML = ""; // Limpa a lista atual antes de exibir novamente as tarefas.

    completedTasks.forEach(task => { // Percorre todas as tarefas retornadas pelo backend.

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

        taskList.appendChild(taskCard); // Adiciona o card criado na lista de tarefas.

    });

}

loadCompletedTasks();