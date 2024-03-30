import { default as Weather }  from '../enums/WeatherConditionEnum';
import { ReactComponent as cloud } from '../icons/weather/cloud.m.svg';
import { ReactComponent as rain } from '../icons/weather/rain.m.svg';
import { ReactComponent as fog } from '../icons/weather/fog.m.svg';
import { ReactComponent as sun } from '../icons/weather/sun.m.svg';
import { ReactComponent as wet } from '../icons/weather/wet.m.svg';
import { ReactComponent as snow } from '../icons/weather/snow.m.svg';
import { ReactComponent as thunderyRain } from '../icons/weather/thunderyRain.m.svg';

export default {
    [Weather.Clouds]: {
        icon: cloud,
        name: `Облачно`,
        gradient: [`#B2D4F7`, `#D9E2F3`],
        cardClassname: `cloud`
    },
    [Weather.Rain]: {
        icon: rain,
        name: `Дождь`,
        gradient: [`#95B6F6`, `#5193DE`],
        cardClassname: `rain`
    },
    [Weather.Fog]: {
        icon: fog,
        name: `Туман`,
        gradient: [`#9da3c7`, `#7E83A9`],
        cardClassname: `fog`
    },
    [Weather.Clear]: {
        icon: sun,
        name: `Ясно`,
        gradient: [`#EFC977`, `#E07256`],
        cardClassname: `sun`
    },
    [Weather.Drizzle]: {
        icon: wet,
        name: `Морось`,
        gradient: [`#95B6F6`, `#5193DE`],
        cardClassname: `wet`
    },
    [Weather.Snow]: {
        icon: snow,
        name: `Снег`,
        gradient: [`#EFC977`, `#E07256`],
        cardClassname: `snow`
    },
    [Weather.Thunderstorm]: {
        icon: thunderyRain,
        name: `Гроза`,
        gradient: [`#95B6F6`, `#F5DA79`],
        cardClassname: `thunder`
    }
};
