import React from 'react';
import {observer, inject} from "mobx-react";
import cn from 'classnames';
import PropTypes from 'prop-types';

import SvgIcon from '../../../../components/common/SvgIcon/SvgIcon';
import {mapGradient} from '../../../../helpers/gradientHelper';

import style from './style.module.scss';
import weatherStyle from '../../../../styles/weather.module.scss';

function WeatherCard(props) {
    const { data, flags } = props;

    console.log(data.today)

    const renderHeader = () => {
       return <div className={style.details}>
            <div className={style.temp}>{data.today.temp}<span className={style.unit}>°C</span></div>
            <div className={style.meta}>
                <div className={style.field}>{data.today.date}</div>
                <div className={style.field}>{data.name}</div>
                {data.today.feelsLike && <div className={cn(style.field, style.subtext)}>
                    Ощущается как {data.today.feelsLike}°C
                </div>}
            </div>
        </div>;
    };

    const renderCondition = () => {
        const [start, end] = data.today.resource.gradient;

        return <div className={style.text} style={{ backgroundImage: mapGradient(start, end) }}>
            {data.today.resource.name}
        </div>;
    };

    if (flags.isLoading) {
        return null;
    }

    return <div className={cn(style.card, weatherStyle[data.today.resource.cardClassname])}>
        {renderHeader()}
        <div className={style.icon__container}>
            <SvgIcon width={`128px`} height={`128px`} Icon={data.today.resource.icon}/>
        </div>
        {renderCondition()}
    </div>;
}

WeatherCard.propTypes = {
    data: PropTypes.shape({
        city: PropTypes.string,
        today: PropTypes.shape({
            date: PropTypes.string,
            temp: PropTypes.number,
            feelsLike: PropTypes.number,
            resource: PropTypes.shape({
                icon: PropTypes.object,
                name: PropTypes.string,
                condition: PropTypes.string,
                gradient: PropTypes.arrayOf(PropTypes.string),
                cardClassname: PropTypes.string
            })
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
            today: store.today
        },
        flags: {
            isLoading: store.isLoading
        }
    };
};

export default inject(injection)(observer(WeatherCard));