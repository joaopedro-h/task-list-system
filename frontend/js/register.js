const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", register);

async function register(event) {
    
    event.preventDefault();

    const email = document.getElementById('email').value;
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

            email: email,
            password: password

        })

    });

    const data = await response.json();

    const message = document.getElementById('message');
    const messageTitle = document.getElementById('messageTitle');
    const messageText = document.getElementById('messageText');

    if (response.ok) {

        message.className = "message success";
        messageTitle.textContent = "Sucesso!";
        messageText.textContent = "Cadastro realizado com sucesso!";

    }else {

        message.className = "message error";
        messageTitle.textContent = "Erro!"
        messageText.textContent = data.error;

    }

    const overlay = document.getElementById("overlay");

    overlay.style.display = "flex";

    const messageButton = document.getElementById("messageButton");

    messageButton.addEventListener("click", () => {
        overlay.style.display = "none";
    });

}