async function completeTask() {
    
    const completeButtons = document.querySelectorAll(".complete-button");

    completeButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const taskId = button.dataset.taskId;

            const token = localStorage.getItem("token");
        
            const response = await fetch(`http://localhost:3333/tasks/${taskId}/complete`, {
        
                method: "PUT",
        
                headers: {
                    "Authorization": `Bearer ${token}`
                }
        
            });

            const data = await response.json();

            console.log(data);
            
        });
        
    });
    
}