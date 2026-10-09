"use strict";
const sessionOverlay = document.getElementById('sessionOverlay');
const sessionMessageButton = document.getElementById('sessionMessageButton');
function sessionExpired() {
    sessionOverlay.style.display = "flex";
}
sessionMessageButton.addEventListener("click", () => {
    localStorage.removeItem("token"); // Remove o token do usuário.
    localStorage.removeItem("userName"); // Remove o userName do usuário.
    window.location.href = "../index.html"; // Retorna o usuário para a tela de login.
});
