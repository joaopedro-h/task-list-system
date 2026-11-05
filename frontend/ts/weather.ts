const weatherCity = document.getElementById('weatherCity') as HTMLElement; // Pega o elemento responsável por exibir o nome da cidade.
const weatherRegion = document.getElementById('weatherRegion') as HTMLElement; // Pega o elemento responsável por exibir a região.
const weatherTemperature = document.getElementById('weatherTemperature') as HTMLElement; // Pega o elemento responsável por exibir a temperatura atual.
const weatherRainChance = document.getElementById('weatherRainChance') as HTMLElement; // Pega o elemento responsável por exibir a probabilidade de chuva.
const weatherCondition = document.getElementById('weatherCondition') as HTMLElement; // Pega o elemento responsável por exibir a condição climática.

async function weatherSearch(): Promise<void> { // Função responsável por consultar os dados do clima e atualizar as informações exibidas no front-end.

    const token: string | null = localStorage.getItem("token"); // Pega o token do usuário armazenado no navegador.

    const API_URL: string = "https://task-list-system-api.onrender.com"; 

    const response: Response = await fetch(`${API_URL}/weather`, { // Envia uma requisição ao backend para consultar os dados do clima.

        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}` // Envia o token para validar o usuário autenticado.
        }

    });

    interface WeatherResult { // Define a estrutura dos dados do clima recebidos do backend.
        location: {
            name: string;
            region: string;
        };
        current: {
            temp_c: number;
            condition: {
                text: string;
            };
        };
        forecast: {
            forecastday: {
                day: {
                    daily_chance_of_rain: number;
                };
            }[];
        };
    }

    if (response.status === 401) { // Verifica se a sessão do usuário expirou ou se o token é inválido.
        sessionExpired();
        return;
    }

    if (!response.ok) { // Verifica se ocorreu algum erro durante a consulta dos dados.
        console.error("Erro ao consultar o clima:", response.status);
        return;
    }

    const weatherResult: WeatherResult = await response.json(); // Converte a resposta JSON recebida do backend para um objeto JavaScript.

    weatherCity.textContent = weatherResult.location.name; // Exibe o nome da cidade.
    weatherRegion.textContent = weatherResult.location.region; // Exibe a região da cidade.
    weatherTemperature.textContent = `${weatherResult.current.temp_c} °C`; // Exibe a temperatura atual em graus Celsius.
    weatherCondition.textContent = weatherResult.current.condition.text; // Exibe a descrição da condição climática.
    weatherRainChance.textContent = `${weatherResult.forecast.forecastday[0].day.daily_chance_of_rain}%`; // Exibe a probabilidade de chuva prevista para o dia.

}

weatherSearch(); // Executa a consulta dos dados meteorológicos ao carregar o arquivo.

const WEATHER_REFRESH_INTERVAL = 15 * 60 * 1000; // Define o intervalo de atualização dos dados do clima em 15 minutos.

setInterval(weatherSearch, WEATHER_REFRESH_INTERVAL); // Atualiza os dados meteorológicos automaticamente a cada 15 minutos.