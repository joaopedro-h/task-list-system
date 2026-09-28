const sessionOverlay = document.getElementById('sessionOverlay');
const sessionMessageButton = document.getElementById('sessionMessageButton');

function sessionExpired() {
    
    sessionOverlay.style.display = "flex";

}

sessionMessageButton.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "../index.html"; 

});