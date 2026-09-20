const taskList = document.getElementById('taskList'); // Pega o elemento do front-end onde as tarefas serão exibidas.

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
    }

    if (!response.ok) { // Verifica se ocorreu algum erro durante a busca das tarefas.
        console.log(tasks.error);
        return; // Interrompe a execução caso a busca não seja realizada com sucesso.
    }

    taskList.innerHTML = ""; // Limpa a lista atual antes de exibir novamente as tarefas.

    tasks.forEach(task => { // Percorre todas as tarefas retornadas pelo backend.

        const taskCard = document.createElement("article"); // Cria um novo card para cada tarefa.

        taskCard.classList.add("task-card");

        if (task.status === "completed") { // Verifica se a tarefa está concluída para montar o card correspondente.

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

        } else { // Caso a tarefa ainda esteja pendente, monta o card com a opção de conclusão.

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

        taskList.appendChild(taskCard); // Adiciona o card criado na lista de tarefas.

    });

    completeTask(); // Adiciona a ação de conclusão aos botões das tarefas pendentes.

}

loadTasks(); // Carrega as tarefas assim que a página é iniciada.

setInterval(async () => { // Atualiza automaticamente a lista de tarefas a cada 30 segundos.

    await loadTasks();

}, 30000);