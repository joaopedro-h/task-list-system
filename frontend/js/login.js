const loginForm = document.getElementById("loginForm");

let loginSuccess = false;

loginForm.addEventListener("submit", login);

async function login(event) {
    
    event.preventDefault();

    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3333/login/user", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            login: login,
            password: password

        })

    });

    const data = await response.json();

    const message = document.getElementById('message');
    const messageTitle = document.getElementById('messageTitle');
    const messageText = document.getElementById('messageText');

    if (response.ok) {

        loginSuccess = true;
        localStorage.setItem("token", data.token);
        
        message.className = "message success";
        messageTitle.textContent = "Sucesso!";
        messageText.textContent = "Login realizado com sucesso!";

    }else {

        loginSuccess = false;

        message.className = "message error";
        messageTitle.textContent = "Erro!"
        messageText.textContent = data.error;

    }
    
    const overlay = document.getElementById("overlay");

    overlay.style.display = "flex";

}

const messageButton = document.getElementById("messageButton");

messageButton.addEventListener("click", () => {
    overlay.style.display = "none";

    if (loginSuccess) {
        window.location.href = "pages/taskList.html"
    }

});