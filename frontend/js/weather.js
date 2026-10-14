"use strict";
async function weatherSearch() {
    const token = localStorage.getItem("token");
    const API_URL = "http:localhost:3333";
    const response = await fetch(`${API_URL}/weather`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const weatherResult = await response.json();
    console.log(weatherResult);
}
weatherSearch();
