type TaskView = "pending" | "in_progress" | "completed" | "searching";

let currentView: TaskView = "pending";
let previousView: Exclude<TaskView, "searching"> = "pending";
let currentSearch: string = "";

async function refreshCurrentView(): Promise<void> {

    if (currentView === "pending") {

        await loadTasks();

    } else if (currentView === "in_progress") {

        await loadInProgressTasks();          

    } else if (currentView === "completed") {

        await loadCompletedTasks();

    } else if (currentView === "searching") {

        await searchTask(currentSearch);

    }

}

refreshCurrentView();

setInterval(refreshCurrentView, 30000); // Atualiza a visualização atual a cada 30 segundos.