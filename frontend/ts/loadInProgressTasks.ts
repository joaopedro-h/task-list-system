const inProgressTasksButton = document.getElementById('inProgressTasksButton');

if (inProgressTasksButton) {

    inProgressTasksButton.addEventListener("click", async () => {

        console.log("Cliquei em Em andamento");

        currentView = "in_progress";
        await refreshCurrentView();

    });

}

async function loadInProgressTasks(): Promise<void> {
    
    const token: string | null = localStorage.getItem("token");

    const API_URL: string = "https://task-list-system-api.onrender.com";

    const response: Response = await fetch(`${API_URL}/tasks`, {

        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`
        }

    });

    interface Task {
        id: number;
        task: string;
        status: string;
        user_name: string;
        created_at: string;
        completed_by: string | null;
        completed_at: string | null;
    }

    const tasks: Task[] = await response.json();

    if (response.status === 404) {

        taskList.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;

    } else if (response.status === 401){

        sessionExpired();
        return;

    }

    const inProgressTasks = tasks.filter(task => task.status === "in_progress");

    if (inProgressTasks.length === 0) {
        taskList.innerHTML = "<p>Nenhuma tarefa em andamento.</p>";
        return;
    }

    taskList.innerHTML = ""; 

    inProgressTasks.forEach(task => { 

        const taskCard = document.createElement("article"); 

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

                    <p class="task-status progress">
                        Em andamento
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

        taskList.appendChild(taskCard);

    });

    completeTask();

}