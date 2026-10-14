class WeatherService {

    async execute () {

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

        const weather = await response.json();

        console.log({
            cidade: weather.location.name,
            regiao: weather.location.region,
            pais: weather.location.country,
            horarioLocal: weather.location.localtime,
            ultimaAtualizacao: weather.current.last_updated,
            temperatura: weather.current.temp_c,
            sensacaoTermica: weather.current.feelslike_c
        });

        return weather;

    }

}

export default new WeatherService();