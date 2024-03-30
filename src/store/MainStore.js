import {makeAutoObservable} from 'mobx';

import {getLocationData, getWeatherData} from '../services/weatherDataService';
import {mapWeatherData} from '../helpers/mapper';

import locationModel from './models/locationModel';
import weatherModel from './models/weatherModel';
import WeatherResource from '../resources/weatherResource';
import WeatherConditionEnum from '../enums/WeatherConditionEnum';

export default class MainStore {
    location = locationModel;
    weather = [];

    loading = true;

    constructor() {
        makeAutoObservable(this);

        this.init();
    }

    // ACTION //

    init = async () => {
        await this.loadLocationData();
        await this.loadWeatherData();
    }

    loadLocationData = async () => {
        try {
            const [{ name, lon, lat }] = await getLocationData(`Санкт-Петербург`);

            this.location = { ...this.location, name, lon, lat };
        } catch (e) {
            console.error(e.message);
        }
    }

    loadWeatherData = async () => {
        try {
            const response = await getWeatherData(this.location.lat, this.location.lon);

            this.weather = mapWeatherData(response.list);
        } catch (e) {
            console.error(e.message);
        } finally {
            this.loading = false;
        }
    }

    get isLoading() {
        return this.loading;
    }

    get today() {
        return this.weather[0] || weatherModel;
    }

    get todayWeatherResource() {
        return WeatherResource[this.today.condition] || WeatherResource[WeatherConditionEnum.Clouds];
    }
}