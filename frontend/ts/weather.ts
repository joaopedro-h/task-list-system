async function weatherSearch(): Promise<void> {

    const token: string | null = localStorage.getItem("token");

    const API_URL: string = "http:localhost:3333";

    const response: Response = await fetch(`${API_URL}/weather`, {

        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`
        }

    });

    const weatherResult = await response.json();

    console.log(weatherResult);
    

}

weatherSearch();