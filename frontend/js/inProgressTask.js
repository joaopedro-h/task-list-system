"use strict";
function inProgressTask() {
    const progressButtons = document.querySelectorAll(".progress-button");
    progressButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const taskId = button.dataset.taskId;
            const token = localStorage.getItem("token");
            const API_URL = "https://task-list-system-api.onrender.com";
            const response = await fetch(`${API_URL}/tasks/${taskId}/progress`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                await refreshCurrentView();
            }
            else if (response.status === 401) {
                sessionExpired();
                return;
            }
        });
    });
}
//# sourceMappingURL=inProgressTask.js.map