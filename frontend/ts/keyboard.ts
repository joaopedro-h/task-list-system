document.addEventListener("keydown", (event: KeyboardEvent) => {

    if (event.key === "Escape") {

        if (taskOverlay.style.display === "flex") {
            taskOverlay.style.display = "none";
            taskForm.reset();
            taskMessage.textContent = "";
        }

        if (editTaskOverlay.style.display === "flex") {
            editTaskOverlay.style.display = "none";
            taskMessageEdit.textContent = "";
        }

        if (searchOverlay.style.display === "flex") {
            searchOverlay.style.display = "none";
            searchInput.value = "";
        }

        if (userMenu.style.display === "block") {
            userMenu.style.display = "none";
        }

    }

});