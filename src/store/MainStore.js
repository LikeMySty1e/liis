import {makeAutoObservable, runInAction} from 'mobx';

import {getLocationData, getWeatherData} from '../services/weatherDataService';
import {mapWeatherData} from '../helpers/mapper';

import locationModel from './models/locationModel';
import weatherModel from './models/weatherModel';

export default class MainStore {
    location = locationModel;
    today = weatherModel;
    rest = [];

    loading = true;

    interval = 60 * 1000;

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

            runInAction(() => {
                this.location = { ...this.location, name, lon, lat };
            });
        } catch (e) {
            console.error(e.message);
        }
    }

    loadWeatherData = async () => {
        if (!this.location.lat || !this.location.lon) {
            return;
        }

        try {
            const response = await getWeatherData(this.location.lat, this.location.lon);

            runInAction(() => {
                const { today = weatherModel, rest = [] } = mapWeatherData(response.list);

                this.today = today;
                this.rest = rest;
                this.loading = false;
            });
        } catch (e) {
            console.error(e.message);
        }
    }

    get isLoading() {
        return this.loading;
    }
}