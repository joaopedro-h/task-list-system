"use strict";
const registerForm = document.getElementById("registerForm"); // Pega as informações necessárias do front-end para realizar o cadastro.
const registerOverlay = document.getElementById("overlay");
const registerMessage = document.getElementById('message');
const registerMessageTitle = document.getElementById('messageTitle');
const registerMessageText = document.getElementById('messageText');
const registerMessageButton = document.getElementById("messageButton");
let registerSuccess = false; // Armazena o resultado do cadastro para controlar o redirecionamento.
registerForm.addEventListener("submit", register); // Executa a função de cadastro ao enviar o formulário.
async function register(event) {
    event.preventDefault(); // Impede o recarregamento da página ao enviar o formulário.
    const name = document.getElementById('name').value; // Pega os valores inseridos pelo usuário no formulário.
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password != confirmPassword) { // Valida se a senha e a confirmação de senha são iguais.
        alert('As senhas não coincidem.');
        return;
    }
    const API_URL = "https://task-list-system-api.onrender.com";
    const response = await fetch(`${API_URL}/register/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            login: login,
            password: password
        })
    });
    const data = await response.json(); // Converte a resposta JSON recebida do backend para um objeto JavaScript.
    if (response.ok) { // Verifica se o cadastro foi realizado com sucesso.
        registerSuccess = true;
        registerMessage.className = "message success";
        registerMessageTitle.textContent = "Sucesso!";
        registerMessageText.textContent = "Cadastro realizado com sucesso!";
    }
    else {
        registerSuccess = false;
        registerMessage.className = "message error";
        registerMessageTitle.textContent = "Erro!";
        registerMessageText.textContent = data.error;
    }
    registerOverlay.style.display = "flex"; // Exibe a mensagem de sucesso ou erro para o usuário.
}
registerMessageButton.addEventListener("click", () => {
    registerOverlay.style.display = "none";
    if (registerSuccess) { // Redireciona para o login caso o cadastro tenha sido concluído.
        window.location.href = "index.html";
    }
});
