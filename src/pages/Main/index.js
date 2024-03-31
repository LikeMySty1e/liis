import React from 'react';
import {observer, inject} from "mobx-react";
import cn from 'classnames';
import PropTypes from 'prop-types';

import WeatherCard from './components/WeatherCard';
import WeatherList from './components/WeatherList';
import WeatherButtons from './components/WeatherButtons';
import {useInterval} from '../../hooks/useInterval';

import style from './style.module.scss';

function Main(props) {
    const { data, flags, actions } = props;

    useInterval({
        callback: actions.loadWeatherData,
        onResponse: () => console.log(`Погода перезагружена`),
        onError: e => console.error(`Возникла ошибка при попытке интервального обновления погоды: ${e}`),
        delay: data.interval
    });

    return <div className={cn(style.main, { [style.main__loaded]: !flags.isLoading })}>
        <WeatherButtons />
        <div className={style.weather__container}>
            <WeatherCard />
            <WeatherList />
        </div>
    </div>;
}

Main.propTypes = {
    data: PropTypes.shape({
        interval: PropTypes.number
    }),
    flags: PropTypes.shape({
        isLoading: PropTypes.bool
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
        flags: {
            isLoading: store.isLoading
        },
        actions: {
            loadWeatherData: store.loadWeatherData
        }
    };
};

export default inject(injection)(observer(Main));
