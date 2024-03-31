import WeatherResource from '../resources/weatherResource';
import WeatherConditionEnum from '../enums/WeatherConditionEnum';

export const getWeatherResource = condition => {
    return WeatherResource[condition] || WeatherResource[WeatherConditionEnum.Clouds];
};

export const mapWeatherData = (list = []) => {
    const mappedWeatherData = [];

    for (let i = 0; (i + 8) <= list.length; i += 8) {
        if (!list[i]) {
            return;
        }

        const [weather] = list[i].weather;

        mappedWeatherData.push({
            date: new Date(list[i].dt_txt).toLocaleDateString().slice(0, 10),
            temp: Math.round(list[i].main.temp),
            feelsLike: Math.round(list[i].main.feels_like),
            condition: weather.main,
            resource: getWeatherResource(weather.main)
        })
    }

    const today = mappedWeatherData.shift();

    return {
        today,
        rest: mappedWeatherData
    };
};

export default { mapWeatherData, getWeatherResource };
