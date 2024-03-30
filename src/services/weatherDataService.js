import httpClientHelper from '../http/httpClientHelper';
import {API_KEY} from '../resources/consts';

export const getLocationData = (city) => {
    return httpClientHelper.get(`/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,false);
};

export const getWeatherData = (lat, lon) => {
    return httpClientHelper.get(`/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`, false);
};

export default { getWeatherData, getLocationData };
