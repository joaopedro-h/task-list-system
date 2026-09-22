const editTaskOverlay = document.getElementById('editTaskOverlay');
const editTaskInput = document.getElementById('editTask');
const editTaskForm = document.getElementById('editTaskForm');
const cancelEditTaskButton = document.getElementById('cancelEditTaskButton');

cancelEditTaskButton.addEventListener("click", () => {
    editTaskOverlay.style.display = "none";
});

let taskId;

function editTask() {
    
    const editButtons = document.querySelectorAll(".edit-button");

    editButtons.forEach(button => {
        
        button.addEventListener("click", () => {
            
            taskId = button.dataset.taskId;
            const taskName = button.dataset.taskName;
            
            editTaskInput.value = taskName;
            
            editTaskOverlay.style.display = "flex";
            
        });
        
    });
    
}

editTaskForm.addEventListener("submit", updateTask);

async function updateTask(event) {
    
    event.preventDefault();

    const newTaskName = editTaskInput.value;

    const token = localStorage.getItem("token");

    const API_URL = "http://localhost:3333";

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
        loadTasks();
    }
    
}