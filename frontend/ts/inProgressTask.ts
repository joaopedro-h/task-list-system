function inProgressTask(): void {
    
    const progressButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".progress-button");

    progressButtons.forEach(button => {

        button.addEventListener("click", async ()=> {
            
            const taskId: string | undefined = button.dataset.taskId;

            const token: string | null = localStorage.getItem("token");

            const API_URL: string = "https://task-list-system-api.onrender.com";

            const response: Response = await fetch(`${API_URL}/tasks/${taskId}/progress`, {

                method: "PUT",

                headers: {
                    "Authorization": `Bearer ${token}`
                }

            });

            if (response.ok) { 

                await refreshCurrentView();

            } else if(response.status === 401){

                sessionExpired(); 
                return;

            }            

        });

    });

}