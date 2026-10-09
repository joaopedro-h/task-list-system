"use strict";
const editTaskOverlay = document.getElementById('editTaskOverlay'); // Pega os elementos necessários do front-end para realizar a edição da tarefa.
const editTaskInput = document.getElementById('editTask');
const editTaskForm = document.getElementById('editTaskForm');
const cancelEditTaskButton = document.getElementById('cancelEditTaskButton');
const taskMessageEdit = document.getElementById('taskMessageEdit'); // Pega o elemento responsável por exibir as mensagens da edição.
cancelEditTaskButton.addEventListener("click", () => {
    editTaskOverlay.style.display = "none";
    taskMessageEdit.textContent = "";
});
let taskId; // Variável que armazena o ID da tarefa selecionada para edição.
let taskName; // Variável que armazena o nome atual da tarefa selecionada.
function editTask() {
    const editButtons = document.querySelectorAll(".edit-button"); // Pega todos os botões de edição das tarefas.
    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            taskId = Number(button.dataset.taskId); // Pega o ID e o nome da tarefa armazenados no botão selecionado.
            taskName = button.dataset.taskName;
            editTaskInput.value = taskName; // Preenche o campo de edição com o nome atual da tarefa.
            editTaskOverlay.style.display = "flex"; // Exibe a tela de edição da tarefa.
        });
    });
}
editTaskForm.addEventListener("submit", updateTask); // Executa a atualização da tarefa ao enviar o formulário.
async function updateTask(event) {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário.
    const newTaskName = editTaskInput.value; // Pega o novo nome informado para a tarefa.
    if (newTaskName === taskName) { // Verifica se houve alguma alteração no nome da tarefa.
        taskMessageEdit.className = "task-message error";
        taskMessageEdit.textContent = "Não houve alteração na tarefa!";
        return;
    }
    const token = localStorage.getItem("token"); // Pega o token do usuário armazenado no navegador.
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
    if (response.ok) { // Verifica se a tarefa foi atualizada com sucesso.
        taskMessageEdit.className = "task-message success";
        taskMessageEdit.textContent = "Tarefa editada!";
        editTaskForm.reset(); // Limpa o campo do formulário após a edição.
        await loadTasks(); // Carrega novamente as tarefas para atualizar a lista.
    }
    else if (response.status === 400) {
        const data = await response.json();
        taskMessageEdit.className = "task-message error";
        taskMessageEdit.textContent = data.error;
        editTaskForm.reset();
        await loadTasks();
    }
    else if (response.status === 401) {
        sessionExpired(); // Exibe o aviso informando que a sessão do usuário expirou.
        return;
    }
}
