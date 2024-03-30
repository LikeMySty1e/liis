import React from 'react';
import {observer} from "mobx-react";

import Container from '../../components/common/Container/Container';
import WeatherCard from './components/WeatherCard';

import style from './style.module.scss';

function Main() {
    return  <div className={style.main}>
        <Container>
            <div className={style.weather__container}>
                <WeatherCard />
            </div>
        </Container>
        </div>
}

export default observer(Main);
