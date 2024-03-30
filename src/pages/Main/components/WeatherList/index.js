import React from 'react';
import {observer, inject} from "mobx-react";
import PropTypes from 'prop-types';

import SvgIcon from '../../../../components/common/SvgIcon/SvgIcon';

import style from './style.module.scss';

function WeatherList(props) {
    const { data, flags } = props;

    if (flags.isLoading) {
        return null;
    }

    return <div className={style.list}>
        {data.rest.map(item => <div className={style.item}>
            <SvgIcon width={`48px`} height={`48px`} Icon={item.resource.icon}/>
            <div className={style.details}>
                <div className={style.temp}>{item.temp}<span className={style.unit}>°C</span></div>
                <div className={style.date}>{item.date}</div>
            </div>
        </div>)}
    </div>;
}

WeatherList.propTypes = {
    data: PropTypes.shape({
        rest: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.number,
                temp: PropTypes.number,
                feelsLike: PropTypes.number,
                resource: PropTypes.shape({
                    icon: PropTypes.object,
                    name: PropTypes.string,
                    gradient: PropTypes.arrayOf(PropTypes.string),
                    cardClassname: PropTypes.string
                })
            })
        )
    }),
    flags: PropTypes.shape({
        isLoading: PropTypes.bool
    })
};

const injection = ({ store }) => {
    return {
        data: {
            rest: store.rest
        },
        flags: {
            isLoading: store.isLoading
        }
    };
};

export default inject(injection)(observer(WeatherList));