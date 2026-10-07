const loginForm = document.getElementById("loginForm") as HTMLFormElement; // Pega as informações necessárias do front-end para realizar o login.
const overlay = document.getElementById("overlay") as HTMLElement; // Pega o overlay utilizado para exibir o resultado do login.
const message = document.getElementById('message') as HTMLElement;
const messageTitle = document.getElementById('messageTitle') as HTMLElement;
const messageText = document.getElementById('messageText') as HTMLElement;
const messageButton = document.getElementById("messageButton") as HTMLButtonElement;

let loginSuccess: boolean = false; // Armazena o resultado do login para controlar o redirecionamento.

interface LoginResponse {
    token: string;
    name: string;
    error: string;
}

loginForm.addEventListener("submit", login); // Executa a função de login ao enviar o formulário.

async function login(event: SubmitEvent): Promise<void> { // Função responsável por realizar o login do usuário.

    event.preventDefault(); // Impede o recarregamento da página ao enviar o formulário.

    const login: string = (document.getElementById("login") as HTMLInputElement).value; // Pega os valores inseridos pelo usuário no formulário.
    const password: string = (document.getElementById("password") as HTMLInputElement).value;
    const API_URL: string = "https://task-list-system-api.onrender.com";
    
    const response: Response = await fetch(`${API_URL}/login/user`, { // Envia os dados de login para o backend.

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            login: login,
            password: password

        })

    });

    const data: LoginResponse = await response.json(); // Converte a resposta JSON recebida do backend para um objeto JavaScript.

    if (response.ok) { // Verifica se o login foi realizado com sucesso.

        loginSuccess = true;

        localStorage.setItem("token", data.token); // Armazena o token e o nome do usuário no navegador.
        localStorage.setItem("userName", data.name); // Armazena o nome do usuário no navegador para usar depois o login.

        message.className = "message success";
        messageTitle.textContent = "Sucesso!";
        messageText.textContent = "Login realizado com sucesso!";

    }else {

        loginSuccess = false;

        message.className = "message error";
        messageTitle.textContent = "Erro!"
        messageText.textContent = data.error;

    }

    overlay.style.display = "flex"; // Exibe a mensagem de sucesso ou erro para o usuário.

}

messageButton.addEventListener("click", () => { // Fecha a mensagem exibida após a tentativa de login.

    overlay.style.display = "none";

    if (loginSuccess) { // Redireciona para a lista de tarefas caso o login tenha sido realizado com sucesso.
        window.location.href = "pages/taskList.html"
    }  
    
});