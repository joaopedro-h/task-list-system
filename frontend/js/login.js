"use strict";
const loginForm = document.getElementById("loginForm"); // Pega as informações necessárias do front-end para realizar o login.
const loginOverlay = document.getElementById("overlay"); // Pega o overlay utilizado para exibir o resultado do login.
const loginMessage = document.getElementById('message');
const loginMessageTitle = document.getElementById('messageTitle');
const loginMessageText = document.getElementById('messageText');
const loginMessageButton = document.getElementById("messageButton");
let loginSuccess = false; // Armazena o resultado do login para controlar o redirecionamento.
loginForm.addEventListener("submit", login); // Executa a função de login ao enviar o formulário.
async function login(event) {
    event.preventDefault(); // Impede o recarregamento da página ao enviar o formulário.
    const login = document.getElementById("login").value; // Pega os valores inseridos pelo usuário no formulário.
    const password = document.getElementById("password").value;
    const API_URL = "https://task-list-system-api.onrender.com";
    const response = await fetch(`${API_URL}/login/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    });
    const data = await response.json(); // Converte a resposta JSON recebida do backend para um objeto JavaScript.
    if (response.ok) { // Verifica se o login foi realizado com sucesso.
        loginSuccess = true;
        localStorage.setItem("token", data.token); // Armazena o token e o nome do usuário no navegador.
        localStorage.setItem("userName", data.name); // Armazena o nome do usuário no navegador para usar depois o login.
        loginMessage.className = "message success";
        loginMessageTitle.textContent = "Sucesso!";
        loginMessageText.textContent = "Login realizado com sucesso!";
    }
    else {
        loginSuccess = false;
        loginMessage.className = "message error";
        loginMessageTitle.textContent = "Erro!";
        loginMessageText.textContent = data.error;
    }
    loginOverlay.style.display = "flex"; // Exibe a mensagem de sucesso ou erro para o usuário.
}
loginMessageButton.addEventListener("click", () => {
    loginOverlay.style.display = "none";
    if (loginSuccess) { // Redireciona para a lista de tarefas caso o login tenha sido realizado com sucesso.
        window.location.href = "pages/taskList.html";
    }
});
