import React from 'react';
import {observer, inject} from "mobx-react";
import cn from 'classnames';
import PropTypes from 'prop-types';

import SvgIcon from '../../../../components/common/SvgIcon/SvgIcon';
import {mapGradient} from '../../../../helpers/gradientHelper';

import style from './style.module.scss';

function WeatherCard(props) {
    const { data, flags } = props;

    const getCardClassnames = () => {
        return cn(
            style.card,
            style[data.todayWeatherResource.cardClassname]
        );
    };

    const renderHeader = () => {
       return <div className={style.details}>
            <div className={style.temp}>{data.today.temp}<span className={style.unit}>°C</span></div>
            <div className={style.meta}>
                <div className={style.field}>{data.name}</div>
                {data.today.feelsLike && <div className={cn(style.field, style.subtext)}>
                    Ощущается как {data.today.feelsLike}°C
                </div>}
            </div>
        </div>;
    };

    const renderCondition = () => {
        const [start, end] = data.todayWeatherResource.gradient;

        return <div className={style.text} style={{ backgroundImage: mapGradient(start, end) }}>
            {data.todayWeatherResource.name}
        </div>;
    };

    if (flags.isLoading) {
        return null;
    }

    return <div className={getCardClassnames()}>
        {renderHeader()}
        <div className={style.icon__container}>
            <SvgIcon width={`128px`} height={`128px`} Icon={data.todayWeatherResource.icon}/>
        </div>
        {renderCondition()}
    </div>;
}

WeatherCard.propTypes = {
    data: PropTypes.shape({
        city: PropTypes.string,
        today: PropTypes.shape({
            date: PropTypes.number,
            temp: PropTypes.number,
            feelsLike: PropTypes.number
        }),
        todayWeatherResource: PropTypes.shape({
            icon: PropTypes.object,
            name: PropTypes.string,
            gradient: PropTypes.arrayOf(PropTypes.string),
            cardClassname: PropTypes.string
        })
    }),
    flags: PropTypes.shape({
        isLoading: PropTypes.bool
    })
};

const injection = ({ store }) => {
    return {
        data: {
            name: store.location.name,
            today: store.today,
            todayWeatherResource: store.todayWeatherResource
        },
        flags: {
            isLoading: store.isLoading
        }
    };
};

export default inject(injection)(observer(WeatherCard));