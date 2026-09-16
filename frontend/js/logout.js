const userMenuButton = document.getElementById('userMenuButton');
const userMenu = document.getElementById('userMenu');
const logoutButton = document.getElementById('logoutButton');

userMenuButton.addEventListener("click", () => {

    if (userMenu.style.display === "block") {
        userMenu.style.display = "none";

    } else {
        userMenu.style.display = "block";
    }

});

logoutButton.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    window.location.href = "../login.html";

});