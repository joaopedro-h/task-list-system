"use strict";
const weatherCity = document.getElementById('weatherCity');
const weatherRegion = document.getElementById('weatherRegion');
const weatherTemperature = document.getElementById('weatherTemperature');
const weatherRainChance = document.getElementById('weatherRainChance');
const weatherCondition = document.getElementById('weatherCondition');
async function weatherSearch() {
    const token = localStorage.getItem("token");
    const API_URL = "http://localhost:3333";
    const response = await fetch(`${API_URL}/weather`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.status === 401) {
        sessionExpired();
        return;
    }
    if (!response.ok) {
        console.error("Erro ao consultar o clima:", response.status);
        return;
    }
    const weatherResult = await response.json();
    weatherCity.textContent = weatherResult.location.name;
    weatherRegion.textContent = weatherResult.location.region;
    weatherTemperature.textContent = `${weatherResult.current.temp_c} °C`;
    weatherCondition.textContent = weatherResult.current.condition.text;
    weatherRainChance.textContent = `${weatherResult.forecast.forecastday[0].day.daily_chance_of_rain}%`;
}
weatherSearch();
