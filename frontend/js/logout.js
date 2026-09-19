const userMenuButton = document.getElementById('userMenuButton'); // Pega o botão ao lado do nome do usuário para abrir o menu.
const userMenu = document.getElementById('userMenu'); // Pega o menu que aparece com a opção de sair da conta.
const logoutButton = document.getElementById('logoutButton'); // Pega o botão "Sair" que fica dentro do menu.

userMenuButton.addEventListener("click", () => { // Quando o usuário clicar na seta, abre ou fecha o menu.

    if (userMenu.style.display === "block") { // Verifica se o menu já está exibido.
        userMenu.style.display = "none"; // Se estiver exibido, fecha o menu.
        
    } else {
        userMenu.style.display = "block"; // Se estiver oculto, mostra o menu.
    }

});

logoutButton.addEventListener("click", () => { // Quando o usuário clicar em "Sair", realiza o logout.

    localStorage.removeItem("token"); // Apaga o token salvo no navegador para remover a autenticação do usuário.
    localStorage.removeItem("userName"); // Apaga também o nome do usuário que estava salvo no navegador.

    window.location.href = "../index.html"; // Volta o usuário para a página de login após realizar o logout.

});