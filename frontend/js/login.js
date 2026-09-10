const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", login);

async function login(event) {
    
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3333/login/user", {

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

    localStorage.setItem("token", data.token);

    const message = document.getElementById('message');
    const messageTitle = document.getElementById('messageTitle');
    const messageText = document.getElementById('messageText');

    if (response.ok) {

        message.className = "message success";
        messageTitle.textContent = "Sucesso!";
        messageText.textContent = "Login realizado com sucesso!";

    }else {

        message.className = "message error";
        messageTitle.textContent = "Erro!"
        messageText.textContent = data.error;

    }

    message.style.display = "block";

    const messageButton = document.getElementById("messageButton");

    messageButton.addEventListener("click", () => {
        message.style.display = "none";
    });

}