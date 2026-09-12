const newTaskButton = document.getElementById("newTaskButton");
const taskOverlay = document.getElementById("taskOverlay");
const taskForm = document.getElementById("taskForm");

newTaskButton.addEventListener("click", () =>{
    taskOverlay.style.display = "flex";
});

taskForm.addEventListener("submit", createTask);

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
        
        console.log("Tarefa criada com sucesso!");
        console.log(data.task);
        
    }else if (response.status === 401){

        localStorage.removeItem("token");
        window.location.href = "../login.html";

    }else{

        console.log("TESTE");
        
    }

}