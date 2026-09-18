const searchButton = document.getElementById('searchButton'); // Pega as informações necessárias do front-end para realizar a busca das tarefas.
const clearSearchButton = document.getElementById('clearSearchButton');
const searchInput = document.getElementById("researchedTask");

searchButton.addEventListener("click", searchTask) // Executa a função de busca quando o usuário clicar no botão.

searchInput.addEventListener("keydown", function(event) { // Permite realizar a busca também ao pressionar a tecla Enter.
    if (event.key === "Enter") {
        searchTask();
    }
});

clearSearchButton.addEventListener("click", async () => { // Limpa o campo de pesquisa e volta a exibir todas as tarefas.

    searchInput.value = "";
    await loadTasks();

});

async function searchTask() { // Função responsável por realizar a busca de tarefas.

    const researchedTask = document.getElementById('researchedTask').value; // Pega o valor inserido pelo usuário no campo de pesquisa.

    const token = localStorage.getItem("token"); // Pega o token do usuário armazenado no navegador.

    const response = await fetch(`http://localhost:3333/tasks/${encodeURIComponent(researchedTask)}/search`, {

        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}` // Envia o token para validar o usuário autenticado.
        },

    });

    const taskFound = await response.json(); // Converte a resposta JSON recebida do backend para um objeto ou array JavaScript.

    if (!response.ok) { // Verifica se ocorreu algum erro durante a busca.
        console.log(taskFound.error);
        return; // Interrompe a execução caso a busca não seja realizada com sucesso.
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

