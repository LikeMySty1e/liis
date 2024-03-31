import React from 'react';
import {observer, inject} from "mobx-react";
import PropTypes from 'prop-types';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';

import CubeModel from './components/CubeModel';
import {useInterval} from '../../hooks/useInterval';

import style from './style.module.scss';

function Cube(props) {
    const { data, actions } = props;

    useInterval({
        callback: actions.loadWeatherData,
        onResponse: () => console.log(`Погода перезагружена`),
        onError: e => console.error(`Возникла ошибка при попытке интервального обновления погоды: ${e}`),
        delay: data.interval
    });

    return <div className={style.cube__container}>
        <React.Suspense fallback={null}>
            <Canvas>
                <OrbitControls enableZoom={false} enablePan={false}/>
                <ambientLight intensity={1} />
                <directionalLight position={[3, 2, 1]} />
                <CubeModel />
            </Canvas>
        </React.Suspense>
    </div>;
}

Cube.propTypes = {
    data: PropTypes.shape({
        interval: PropTypes.number
    }),
    actions: PropTypes.shape({
        loadWeatherData: PropTypes.func
    })
};

const injection = ({store}) => {
    return {
        data: {
            interval: store.interval
        },
        actions: {
            loadWeatherData: store.loadWeatherData
        }
    };
};

export default inject(injection)(observer(Cube));
