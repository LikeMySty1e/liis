export const mapWeatherData = (list = []) => {
    const mappedWeatherData = [];

    for (let i = 0; (i + 8) <= list.length; i += 8) {
        if (!list[i]) {
            return;
        }

        const [weather] = list[i].weather;

        mappedWeatherData.push({
            date: new Date(list[i].dt_txt).getDate(),
            temp: Math.round(list[i].main.temp),
            feelsLike: Math.round(list[i].main.feels_like),
            condition: weather.main
        })
    }

    return mappedWeatherData;
};

export default { mapWeatherData };
