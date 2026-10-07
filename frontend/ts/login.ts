const loginForm = document.getElementById("loginForm") as HTMLFormElement; // Pega as informações necessárias do front-end para realizar o login.
const loginOverlay = document.getElementById("overlay") as HTMLElement; // Pega o overlay utilizado para exibir o resultado do login.
const loginMessage = document.getElementById('message') as HTMLElement;
const loginMessageTitle = document.getElementById('messageTitle') as HTMLElement;
const loginMessageText = document.getElementById('messageText') as HTMLElement;
const loginMessageButton = document.getElementById("messageButton") as HTMLButtonElement;

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

        loginMessage.className = "message success";
        loginMessageTitle.textContent = "Sucesso!";
        loginMessageText.textContent = "Login realizado com sucesso!";

    }else {

        loginSuccess = false;

        loginMessage.className = "message error";
        loginMessageTitle.textContent = "Erro!"
        loginMessageText.textContent = data.error;

    }

    loginOverlay.style.display = "flex"; // Exibe a mensagem de sucesso ou erro para o usuário.

}

loginMessageButton.addEventListener("click", () => { // Fecha a mensagem exibida após a tentativa de login.

    loginOverlay.style.display = "none";

    if (loginSuccess) { // Redireciona para a lista de tarefas caso o login tenha sido realizado com sucesso.
        window.location.href = "pages/taskList.html"
    }  
    
});