let currentView = "pending"; // Variável que armazena qual tipo de tarefa está sendo exibido atualmente.

async function refreshCurrentView() {

    if (currentView === "pending") {

        await loadTasks();

    } else if (currentView === "completed") {

        await loadCompletedTasks();

    }

}

refreshCurrentView();

setInterval(refreshCurrentView, 30000); // Atualiza a visualização atual a cada 30 segundos.