const newTaskButton = document.getElementById("newTaskButton");
const taskOverlay = document.getElementById("taskOverlay");

newTaskButton.addEventListener("click", () =>{
    taskOverlay.style.display = "flex";
});


function createTask(event) {
    
    event.preventDefault();

}