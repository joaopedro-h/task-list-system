import WeatherService from "../services/WeatherService";

class WeatherController {

    async show (req, res) {

        try {
            
            const weatherResult = await WeatherService.execute();

            return res.status(200).json(weatherResult);

        } catch (error) {
            
            return res.status(400).json({  
                error: error.message
            });

        }

    }

}

export default new WeatherController();