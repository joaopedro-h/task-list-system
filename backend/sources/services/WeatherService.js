import AppError from "../errors/AppError";

let cachedWeather = null; // Armazena os dados do clima em cache.
let cacheTimestamp = 0; // Armazena o horário da última atualização do cache.
const CACHE_DURATION = 15 * 60 * 1000; // Define o tempo de duração do cache em 15 minutos.

class WeatherService {

    async execute () { // Método responsável por consultar os dados do clima e atualizar o cache.

        const now = Date.now(); // Pega o horário atual para verificar a validade do cache.

        if (cachedWeather && now - cacheTimestamp < CACHE_DURATION) { // Verifica se existem dados armazenados e se o cache ainda está no prazo de validade.
            return cachedWeather;
        }

        const API_URL = "https://api.weatherapi.com/v1/forecast.json"; // Define o endereço da API responsável por fornecer os dados do clima.

        const apiKey = process.env.WEATHER_API_KEY; // "apiKey" recebe a chave de acesso da API armazenada no env.

        if (!apiKey) { // Verifica se a chave de acesso da API foi configurada, caso contrário retorna um erro.
            throw new AppError(
                "Serviço de clima não configurado.",
                500,
                "WEATHER_API_KEY_MISSING"
            );
        }

        const params = new URLSearchParams({ // Define os parâmetros que serão enviados na consulta pra API.
            key: apiKey,
            q: "Ibatiba, Espírito Santo, Brazil",
            days: "1",
            aqi: "no",
            alerts: "no"
        });

        let response; // Declara a variável que receberá a resposta da API.

        try {

            response = await fetch(`${API_URL}?${params}`); // Executa a requisição para consultar os dados do clima.

        } catch (error) {

            throw new AppError( // Cria um erro personalizado caso ocorra uma falha de conexão com a API.
                "Não foi possível conectar ao serviço de clima.",
                502,
                "WEATHER_API_UNAVAILABLE"
            );

        }

        if (!response.ok) { // Verifica se a API retornou uma resposta de erro.
            throw new AppError(
                "Não foi possível consultar o clima.",
                502,
                "WEATHER_API_REQUEST_FAILED"
            );
        }

        cachedWeather  = await response.json(); // Converte a resposta JSON e armazena os dados do clima em cache.
        cacheTimestamp = Date.now(); // Atualiza o horário da última consulta realizada com sucesso.

        return cachedWeather ; // Retorna os dados do clima armazenados em cache.

    }

}

export default new WeatherService();