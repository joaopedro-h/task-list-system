const registerForm = document.getElementById("registerForm"); // Pega as informações necessárias do front-end para realizar o cadastro.
const overlay = document.getElementById("overlay");
const message = document.getElementById('message');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');
const messageButton = document.getElementById("messageButton");

let registerSuccess = false; // Armazena o resultado do cadastro para controlar o redirecionamento.

registerForm.addEventListener("submit", register); // Executa a função de cadastro ao enviar o formulário.

async function register(event) { // Função responsável por realizar o cadastro do usuário.

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

    const response = await fetch(`${API_URL}/register/user`, { // Envia os dados do cadastro para o backend.

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

    const data = await response.json(); // Converte a resposta JSON recebida do backend para um objeto ou array JavaScript.

    if (response.ok) { // Verifica se o cadastro foi realizado com sucesso.

        registerSuccess = true;

        message.className = "message success";
        messageTitle.textContent = "Sucesso!";
        messageText.textContent = "Cadastro realizado com sucesso!";

    }else {

        registerSuccess = false;

        message.className = "message error";
        messageTitle.textContent = "Erro!"
        messageText.textContent = data.error;

    }

    overlay.style.display = "flex"; // Exibe a mensagem de sucesso ou erro para o usuário.

}

messageButton.addEventListener("click", () => { // Fecha a mensagem exibida após a tentativa de cadastro.

    overlay.style.display = "none";

    if (registerSuccess) { // Redireciona para o login caso o cadastro tenha sido concluído.
        window.location.href = "login.html"
    }

});