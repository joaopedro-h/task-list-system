const sessionOverlay = document.getElementById('sessionOverlay') as HTMLElement;
const sessionMessageButton = document.getElementById('sessionMessageButton') as HTMLButtonElement;

function sessionExpired(): void { // Função que vai exibir o overlay informando sobre a sessão expirada.
    
    sessionOverlay.style.display = "flex";

}

sessionMessageButton.addEventListener("click", () => { // Adiciona evento de click ao botão.

    localStorage.removeItem("token"); // Remove o token do usuário.
    localStorage.removeItem("userName"); // Remove o userName do usuário.
    window.location.href = "../index.html"; // Retorna o usuário para a tela de login.

});