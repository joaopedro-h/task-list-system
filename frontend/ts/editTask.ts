const editTaskOverlay = document.getElementById('editTaskOverlay') as HTMLElement; // Pega os elementos necessários do front-end para realizar a edição da tarefa.
const editTaskInput = document.getElementById('editTask') as HTMLInputElement;
const editTaskForm = document.getElementById('editTaskForm') as HTMLFormElement;
const cancelEditTaskButton = document.getElementById('cancelEditTaskButton') as HTMLButtonElement;

const taskMessageEdit = document.getElementById('taskMessageEdit') as HTMLElement; // Pega o elemento responsável por exibir as mensagens da edição.

cancelEditTaskButton.addEventListener("click", () => { // Fecha a tela de edição ao clicar no botão de sair.
    editTaskOverlay.style.display = "none";
    taskMessageEdit.textContent = ""
});

let taskId: number; // Variável que armazena o ID da tarefa selecionada para edição.
let taskName: string; // Variável que armazena o nome atual da tarefa selecionada.

function editTask(): void { // Função responsável por adicionar a ação de edição aos botões das tarefas.

    const editButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".edit-button"); // Pega todos os botões de edição das tarefas.

    editButtons.forEach(button => { // Percorre todos os botões de edição.

        button.addEventListener("click", () => {

            taskId = Number(button.dataset.taskId); // Pega o ID e o nome da tarefa armazenados no botão selecionado.
            taskName = button.dataset.taskName as string;

            editTaskInput.value = taskName; // Preenche o campo de edição com o nome atual da tarefa.

            editTaskOverlay.style.display = "flex"; // Exibe a tela de edição da tarefa.

        });

    });

}

editTaskForm.addEventListener("submit", updateTask); // Executa a atualização da tarefa ao enviar o formulário.

async function updateTask(event: SubmitEvent): Promise<void> { // Função responsável por enviar a atualização da tarefa para o backend.

    event.preventDefault(); // Impede o comportamento padrão de envio do formulário.

    const newTaskName = editTaskInput.value; // Pega o novo nome informado para a tarefa.

    if (newTaskName === taskName) { // Verifica se houve alguma alteração no nome da tarefa.

        taskMessageEdit.className = "task-message error";
        taskMessageEdit.textContent = "Não houve alteração na tarefa!"
        return;

    }

    const token: string | null = localStorage.getItem("token"); // Pega o token do usuário armazenado no navegador.

    const API_URL: string = "https://task-list-system-api.onrender.com";

    const response: Response = await fetch(`${API_URL}/tasks/${taskId}`, { // Envia uma requisição ao backend para atualizar a tarefa selecionada.

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },

        body: JSON.stringify({ // Converte os dados da tarefa para JSON antes de enviar ao backend.
            task: newTaskName
        })

    });

    if (response.ok) { // Verifica se a tarefa foi atualizada com sucesso.

        taskMessageEdit.className = "task-message success";
        taskMessageEdit.textContent = "Tarefa editada!";
        editTaskForm.reset(); // Limpa o campo do formulário após a edição.
        await loadTasks(); // Carrega novamente as tarefas para atualizar a lista.
    
    }else if(response.status === 400){

        interface EditTaskResponse {
            error: string;
        }

        const data: EditTaskResponse = await response.json();

        taskMessageEdit.className = "task-message error";
        taskMessageEdit.textContent = data.error;
        editTaskForm.reset(); 
        await loadTasks(); 

    }else if (response.status === 401){

        sessionExpired(); // Exibe o aviso informando que a sessão do usuário expirou.
        return;

    }

}