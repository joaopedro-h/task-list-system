const registerForm = document.getElementById("registerForm");
const overlay = document.getElementById("overlay");
const message = document.getElementById('message');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');
const messageButton = document.getElementById("messageButton");

let registerSuccess = false;

registerForm.addEventListener("submit", register);

async function register(event) {
    
    event.preventDefault();

    const name = document.getElementById('name').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password != confirmPassword) {
        alert('As senhas não coincidem.');
        return;       
    }

    const response = await fetch("http://localhost:3333/register/user", {

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

    const data = await response.json();

    if (response.ok) {

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

    overlay.style.display = "flex";

}

messageButton.addEventListener("click", () => {
    overlay.style.display = "none";

    if (registerSuccess) {
        window.location.href = "login.html"
    }

});