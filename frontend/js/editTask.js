const editTaskOverlay = document.getElementById('editTaskOverlay');
const editTaskInput = document.getElementById('editTask');
const editTaskForm = document.getElementById('editTaskForm');
const cancelEditTaskButton = document.getElementById('cancelEditTaskButton');

const taskMessageEdit = document.getElementById('taskMessageEdit');

cancelEditTaskButton.addEventListener("click", () => {
    editTaskOverlay.style.display = "none";
    taskMessageEdit.textContent = ""
});

let taskId;
let taskName;

function editTask() {
    
    const editButtons = document.querySelectorAll(".edit-button");

    editButtons.forEach(button => {
        
        button.addEventListener("click", () => {
            
            taskId = button.dataset.taskId;
            taskName = button.dataset.taskName;
            
            editTaskInput.value = taskName;
            
            editTaskOverlay.style.display = "flex";
            
        });
        
    });
    
}

editTaskForm.addEventListener("submit", updateTask);

async function updateTask(event) {
    
    event.preventDefault();

    const newTaskName = editTaskInput.value;

    if (newTaskName === taskName) {
        taskMessageEdit.className = "task-message error";
        taskMessageEdit.textContent = "Não houve alteração na tarefa!"
        return;
    }

    const token = localStorage.getItem("token");

    const API_URL = "https://task-list-system-api.onrender.com";

    const response = await fetch(`${API_URL}/tasks/${taskId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        
        body: JSON.stringify({
            task: newTaskName
        })

    });

    if (response.ok) {

        taskMessageEdit.className = "task-message success";
        taskMessageEdit.textContent = "Tarefa editada!"
        await loadTasks();

    }else if (response.status === 401){
        
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.location.href = "../login.html"; // Remove a autenticação e redireciona o usuário para o login.
        return;

    }
    
}