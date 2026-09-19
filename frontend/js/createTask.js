const newTaskButton = document.getElementById("newTaskButton"); // Pega as informações necessárias do front-end para controlar a criação de tarefas.
const cancelTaskButton = document.getElementById("cancelTaskButton");

const taskOverlay = document.getElementById("taskOverlay");
const taskForm = document.getElementById("taskForm");

const userName = localStorage.getItem("userName"); // Pega o nome do usuário armazenado no navegador após o login.
const userNameSpan = document.getElementById("userName");
userNameSpan.textContent = userName; // Exibe o nome do usuário na página.

const taskMessage = document.getElementById("taskMessage");

newTaskButton.addEventListener("click", () =>{ // Exibe o formulário para criação de uma nova tarefa.
    taskOverlay.style.display = "flex";
});

cancelTaskButton.addEventListener("click", () =>{ // Fecha o formulário de criação e limpa as informações inseridas.
    taskOverlay.style.display = "none";
    taskForm.reset();
    taskMessage.textContent = "";

});

taskForm.addEventListener("submit", createTask); // Executa a função de criação quando o formulário for enviado.

const taskInput = document.getElementById("createTaskButton");

taskInput.addEventListener("keydown", function(event) { // Permite executar a criação da tarefa ao pressionar a tecla Enter.

    if (event.key === "Enter") {
        event.preventDefault();
        createTask(event);
    }

});

async function createTask(event) { // Função responsável por realizar a criação de uma nova tarefa.

    event.preventDefault(); // Impede o envio padrão do formulário e evita o recarregamento da página.

    const task = document.getElementById('task').value; // Pega a tarefa inserida pelo usuário.

    const token = localStorage.getItem("token"); // Pega o token do usuário armazenado no navegador.

    const API_URL = "https://task-list-system-api.onrender.com";

    const response = await fetch(`${API_URL}/tasks`, { // Envia os dados da nova tarefa para o backend.

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Envia o token para validar o usuário autenticado.

        },

        body: JSON.stringify({

            task: task
            
        })

    });

    const data = await response.json(); // Converte a resposta JSON recebida do backend para um objeto JavaScript.

    if (response.ok) { // Verifica se a tarefa foi criada com sucesso.

        taskMessage.className = "task-message success";
        taskMessage.textContent = "Tarefa criada com sucesso!";
        taskForm.reset();

        await loadTasks(); // Atualiza a lista de tarefas após a criação.

    }else if (response.status === 401){ // Verifica se o usuário não possui mais uma autenticação válida.

        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.location.href = "../login.html"; // Remove a autenticação e redireciona o usuário para o login.

    }else{

        taskMessage.className = "task-message error";
        taskMessage.textContent = data.error; // Exibe a mensagem de erro retornada pelo backend.

    }

}