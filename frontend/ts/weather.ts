const weatherCity = document.getElementById('weatherCity') as HTMLElement;
const weatherRegion = document.getElementById('weatherRegion') as HTMLElement;
const weatherTemperature = document.getElementById('weatherTemperature') as HTMLElement;
const weatherRainChance = document.getElementById('weatherRainChance') as HTMLElement;
const weatherCondition = document.getElementById('weatherCondition') as HTMLElement;

async function weatherSearch(): Promise<void> {

    const token: string | null = localStorage.getItem("token");

    const API_URL: string = "https://task-list-system-api.onrender.com";

    const response: Response = await fetch(`${API_URL}/weather`, {

        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`
        }

    });

    interface WeatherResult {
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

    if (response.status === 401) {
        sessionExpired();
        return;
    }

    if (!response.ok) {
        console.error("Erro ao consultar o clima:", response.status);
        return;
    }

    const weatherResult: WeatherResult = await response.json();

    weatherCity.textContent = weatherResult.location.name;
    weatherRegion.textContent = weatherResult.location.region;
    weatherTemperature.textContent = `${weatherResult.current.temp_c} °C`;
    weatherCondition.textContent = weatherResult.current.condition.text;
    weatherRainChance.textContent = `${weatherResult.forecast.forecastday[0].day.daily_chance_of_rain}%`;

}

weatherSearch();

const WEATHER_REFRESH_INTERVAL = 15 * 60 * 1000;

setInterval(weatherSearch, WEATHER_REFRESH_INTERVAL);