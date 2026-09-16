const newTaskButton = document.getElementById("newTaskButton");
const cancelTaskButton = document.getElementById("cancelTaskButton");

const taskOverlay = document.getElementById("taskOverlay");
const taskForm = document.getElementById("taskForm");

const userName = localStorage.getItem("userName");
const userNameSpan = document.getElementById("userName");
userNameSpan.textContent = userName;

const taskMessage = document.getElementById("taskMessage");

newTaskButton.addEventListener("click", () =>{
    taskOverlay.style.display = "flex";
});

cancelTaskButton.addEventListener("click", () =>{
    taskOverlay.style.display = "none";
    taskForm.reset();
    taskMessage.textContent = "";
});

taskForm.addEventListener("submit", createTask);

const taskInput = document.getElementById("createTaskButton");

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        createTask(event);
    }
});

async function createTask(event) {
    
    event.preventDefault();

    const task = document.getElementById('task').value;

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3333/tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
            task: task
        })

    });

    const data = await response.json();

    if (response.ok) {
        
        taskMessage.className = "task-message success";
        taskMessage.textContent = "Tarefa criada com sucesso!";

        taskForm.reset();
        await loadTasks();
        
    }else if (response.status === 401){

        localStorage.removeItem("token");
        window.location.href = "../login.html";

    }else{

        taskMessage.className = "task-message error";
        taskMessage.textContent = data.error;
        
    }

}