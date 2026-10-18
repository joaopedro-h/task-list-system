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
            throw new Error("API inválida!");
        }

        const params = new URLSearchParams({
            key: apiKey,
            q: "Ibatiba, Espírito Santo, Brazil",
            days: "1",
            aqi: "no",
            alerts: "no"
        });

        const response = await fetch(`${API_URL}?${params}`);

        if (!response.ok) {
            throw new Error("Não foi possível consultar o clima.");
        }

        cachedWeather  = await response.json();
        cacheTimestamp = Date.now();

        return cachedWeather ;

    }

}

export default new WeatherService();