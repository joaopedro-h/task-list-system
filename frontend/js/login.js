const loginForm = document.getElementById("loginForm");
const message = document.getElementById('message');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');
const messageButton = document.getElementById("messageButton");

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

    if (response.ok) {

        loginSuccess = true;
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        
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

messageButton.addEventListener("click", () => {
    overlay.style.display = "none";

    if (loginSuccess) {
        window.location.href = "pages/taskList.html"
    }

});