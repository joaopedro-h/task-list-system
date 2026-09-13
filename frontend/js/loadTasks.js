const taskList = document.getElementById('taskList');

async function loadTasks() {
    
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3333/tasks", {
        
        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`
        }

    });

    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {

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

                <p class="task-status pending">
                    Pendente
                </p>

            </div>

            <div class="task-buttons">

                <button
                    type="button"
                    class="complete-button"
                >
                    ✓ Concluir
                </button>

            </div>
        `;

        taskList.appendChild(taskCard);

    });
    
}

loadTasks();