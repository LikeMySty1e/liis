import React from 'react';
import {observer, inject} from "mobx-react";
import PropTypes from 'prop-types';

import WeatherCard from './components/WeatherCard';
import WeatherList from './components/WeatherList';
import {useInterval} from '../../hooks/useInterval';

import style from './style.module.scss';


function Main(props) {
    const { data, actions } = props;

    useInterval({
        callback: actions.loadWeatherData,
        onResponse: () => console.log(`Погода перезагружена`),
        onError: e => console.error(`Возникла ошибка при попытке интервального обновления табов: ${e}`),
        delay: data.interval
    })

    return  <div className={style.main}>
        <div className={style.weather__container}>
            <WeatherCard />
            <WeatherList />
        </div>
    </div>
}

Main.propTypes = {
    data: PropTypes.shape({
        interval: PropTypes.number
    }),
    actions: PropTypes.shape({
        loadWeatherData: PropTypes.func
    })
};

const injection = ({ store }) => {
    return {
        data: {
            interval: store.interval
        },
        actions: {
            loadWeatherData: store.loadWeatherData
        }
    };
};

export default inject(injection)(observer(Main));
