type TaskView = "pending" | "in_progress" | "completed" | "searching"; // Define os tipos de visualização de tarefas que podem ser utilizados na aplicação.

let currentView: TaskView = "pending"; // "currentView" armazena a visualização de tarefas exibida atualmente.
let previousView: Exclude<TaskView, "searching"> = "pending"; // "previousView" armazena a última visualização antes de iniciar uma pesquisa.
let currentSearch: string = ""; // "currentSearch" armazena o texto utilizado na pesquisa de tarefas.

async function refreshCurrentView(): Promise<void> { // Função responsável por atualizar a visualização de tarefas selecionada no momento.

    if (currentView === "pending") { // Verifica se a visualização atual é de tarefas pendentes.

        await loadTasks();

    } else if (currentView === "in_progress") { // Verifica se é de tarefas em andamento.

        await loadInProgressTasks();          

    } else if (currentView === "completed") { // Verifica se é de tarefas concluídas.

        await loadCompletedTasks();

    } else if (currentView === "searching") { // Verifica se é de tarefas pesquisadas.

        await searchTask(currentSearch);

    }

}

refreshCurrentView(); // Executa a atualização da visualização atual ao carregar o arquivo.

setInterval(refreshCurrentView, 30000); // Atualiza a visualização atual a cada 30 segundos.