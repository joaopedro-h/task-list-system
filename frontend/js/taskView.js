"use strict";
let currentView = "pending";
let previousView = "pending";
let currentSearch = "";
async function refreshCurrentView() {
    if (currentView === "pending") {
        await loadTasks();
    }
    else if (currentView === "in_progress") {
        await loadInProgressTasks();
    }
    else if (currentView === "completed") {
        await loadCompletedTasks();
    }
    else if (currentView === "searching") {
        await searchTask(currentSearch);
    }
}
refreshCurrentView();
setInterval(refreshCurrentView, 30000); // Atualiza a visualização atual a cada 30 segundos.
