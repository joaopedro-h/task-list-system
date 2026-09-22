const loginForm = document.getElementById("loginForm"); // Pega as informações necessárias do front-end para realizar o login.
const overlay = document.getElementById("overlay"); // Pega o overlay utilizado para exibir o resultado do login.
const message = document.getElementById('message');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');
const messageButton = document.getElementById("messageButton");

let loginSuccess = false; // Armazena o resultado do login para controlar o redirecionamento.

loginForm.addEventListener("submit", login); // Executa a função de login ao enviar o formulário.

async function login(event) { // Função responsável por realizar o login do usuário.

    event.preventDefault(); // Impede o recarregamento da página ao enviar o formulário.

    const login = document.getElementById("login").value; // Pega os valores inseridos pelo usuário no formulário.
    const password = document.getElementById("password").value;
    const API_URL = "http://localhost:3333";
    
    const response = await fetch(`${API_URL}/login/user`, { // Envia os dados de login para o backend.

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            login: login,
            password: password

        })

    });

    const data = await response.json(); // Converte a resposta JSON recebida do backend para um objeto ou array JavaScript.

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