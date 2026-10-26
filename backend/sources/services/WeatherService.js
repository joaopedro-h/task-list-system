import AppError from "../errors/AppError";

let cachedWeather = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 15 * 60 * 1000;

class WeatherService {

    async execute () {

        const now = Date.now();

        if (cachedWeather && now - cacheTimestamp < CACHE_DURATION) {
            return cachedWeather;
        }

        const API_URL = "https://api.weatherapi.com/v1/forecast.json";

        const apiKey = process.env.WEATHER_API_KEY;

        if (!apiKey) {
            throw new AppError(
                "Serviço de clima não configurado.",
                500,
                "WEATHER_API_KEY_MISSING"
            );
        }

        const params = new URLSearchParams({
            key: apiKey,
            q: "Ibatiba, Espírito Santo, Brazil",
            days: "1",
            aqi: "no",
            alerts: "no"
        });

        let response;

        try {

            response = await fetch(`${API_URL}?${params}`);

        } catch (error) {

            throw new AppError(
                "Não foi possível conectar ao serviço de clima.",
                502,
                "WEATHER_API_UNAVAILABLE"
            );
            
        }

        if (!response.ok) {
            throw new AppError(
                "Não foi possível consultar o clima.",
                502,
                "WEATHER_API_REQUEST_FAILED"
            );
        }

        cachedWeather  = await response.json();
        cacheTimestamp = Date.now();

        return cachedWeather ;

    }

}

export default new WeatherService();