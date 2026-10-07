const registerForm = document.getElementById("registerForm") as HTMLFormElement; // Pega as informações necessárias do front-end para realizar o cadastro.
const registerOverlay = document.getElementById("overlay") as HTMLElement;
const registerMessage = document.getElementById('message') as HTMLElement;
const registerMessageTitle = document.getElementById('messageTitle') as HTMLElement;
const registerMessageText = document.getElementById('messageText') as HTMLElement;
const registerMessageButton = document.getElementById("messageButton") as HTMLButtonElement;

let registerSuccess: boolean = false; // Armazena o resultado do cadastro para controlar o redirecionamento.

interface RegisterResponse {
    id: number,
    name: string,
    login: string,
    error: string
}

registerForm.addEventListener("submit", register); // Executa a função de cadastro ao enviar o formulário.

async function register(event: SubmitEvent): Promise<void> { // Função responsável por realizar o cadastro do usuário.

    event.preventDefault(); // Impede o recarregamento da página ao enviar o formulário.

    const name: string = (document.getElementById('name') as HTMLInputElement).value; // Pega os valores inseridos pelo usuário no formulário.
    const login: string = (document.getElementById('login') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword: string = (document.getElementById('confirmPassword') as HTMLInputElement).value;

    if (password != confirmPassword) { // Valida se a senha e a confirmação de senha são iguais.
        alert('As senhas não coincidem.');
        return;       
    }

    const API_URL: string = "https://task-list-system-api.onrender.com";

    const response: Response = await fetch(`${API_URL}/register/user`, { // Envia os dados do cadastro para o backend.

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

    const data: RegisterResponse = await response.json(); // Converte a resposta JSON recebida do backend para um objeto JavaScript.

    if (response.ok) { // Verifica se o cadastro foi realizado com sucesso.

        registerSuccess = true;

        registerMessage.className = "message success";
        registerMessageTitle.textContent = "Sucesso!";
        registerMessageText.textContent = "Cadastro realizado com sucesso!";

    }else {

        registerSuccess = false;

        registerMessage.className = "message error";
        registerMessageTitle.textContent = "Erro!"
        registerMessageText.textContent = data.error;

    }

    registerOverlay.style.display = "flex"; // Exibe a mensagem de sucesso ou erro para o usuário.

}

registerMessageButton.addEventListener("click", () => { // Fecha a mensagem exibida após a tentativa de cadastro.

    registerOverlay.style.display = "none";

    if (registerSuccess) { // Redireciona para o login caso o cadastro tenha sido concluído.
        window.location.href = "index.html"
    }

});