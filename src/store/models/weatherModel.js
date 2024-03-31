import WeatherResource from '../../resources/weatherResource';
import WeatherConditionEnum from '../../enums/WeatherConditionEnum';

export default {
    temp: null,
    feelsLike: null,
    date: null,
    condition: null,
    resource: WeatherResource[WeatherConditionEnum.Clear]
};
