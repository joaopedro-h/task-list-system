import deleteTaskService from "../services/DeleteTaskService";

async function deleteCompletedTask() {
    
    await deleteTaskService.execute();

}

function startDeleteCompletedTasks() {
    
    setInterval(async () => {

        await deleteCompletedTask();

    }, 2 * 60 * 60 * 1000);

}

export default startDeleteCompletedTasks;