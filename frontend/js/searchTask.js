const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById("researchedTask");

searchButton.addEventListener("click", searchTask)

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchTask();
    }
});

async function searchTask() {

    const researchedTask = document.getElementById('researchedTask').value;

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3333/tasks/${encodeURIComponent(researchedTask)}/search`, {

        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`
        },

    });

    const taskFound = await response.json();

    if (!response.ok) {
        console.log(taskFound.error);
        return;
    }

    taskList.innerHTML = "";

    taskFound.forEach(task => {

        const taskCard = document.createElement("article");

        taskCard.classList.add("task-card");

        if (task.status === "completed") {

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

        } else {

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

        taskList.appendChild(taskCard);

    });

    completeTask();
    
}

