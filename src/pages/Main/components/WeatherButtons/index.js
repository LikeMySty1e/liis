import React from 'react';
import {observer, inject} from "mobx-react";
import PropTypes from 'prop-types';

import SvgIcon from '../../../../components/common/SvgIcon/SvgIcon';

import style from './style.module.scss';

function WeatherButtons(props) {
    const { data, actions, flags } = props;

    if (flags.isLoading) {
        return null;
    }

    return <div className={style.buttons}>
        {Object.values(data.weatherResource).map(item => <div
            key={item.condition}
            className={style.icon__button}
            onClick={() => actions.changeConditionForToday(item.condition)}
        >
            <SvgIcon width={`36px`} height={`36px`} Icon={item.icon}/>
        </div>)}
    </div>;
}

WeatherButtons.propTypes = {
    data: PropTypes.shape({
        weatherResource: PropTypes.object,
    }),
    actions: PropTypes.shape({
        changeConditionForToday: PropTypes.func
    }),
    flags: PropTypes.shape({
        isLoading: PropTypes.bool
    })
};

const injection = ({ store }) => {
    return {
        data: {
            weatherResource: store.weatherResource
        },
        actions: {
            changeConditionForToday: store.changeConditionForToday
        },
        flags: {
            isLoading: store.isLoading
        }
    };
};

export default inject(injection)(observer(WeatherButtons));
