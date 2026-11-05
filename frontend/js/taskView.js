"use strict";
let currentView = "pending"; // "currentView" armazena a visualização de tarefas exibida atualmente.
let previousView = "pending"; // "previousView" armazena a última visualização antes de iniciar uma pesquisa.
let currentSearch = ""; // "currentSearch" armazena o texto utilizado na pesquisa de tarefas.
async function refreshCurrentView() {
    if (currentView === "pending") { // Verifica se a visualização atual é de tarefas pendentes.
        await loadTasks();
    }
    else if (currentView === "in_progress") { // Verifica se é de tarefas em andamento.
        await loadInProgressTasks();
    }
    else if (currentView === "completed") { // Verifica se é de tarefas concluídas.
        await loadCompletedTasks();
    }
    else if (currentView === "searching") { // Verifica se é de tarefas pesquisadas.
        await searchTask(currentSearch);
    }
}
refreshCurrentView(); // Executa a atualização da visualização atual ao carregar o arquivo.
setInterval(refreshCurrentView, 30000); // Atualiza a visualização atual a cada 30 segundos.
