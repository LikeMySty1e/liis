import { Provider, observer } from 'mobx-react';

import MainStore from './store/MainStore';
import {useStore} from './hooks/useStore';
import AppRouter from './components/AppRouter';

import './styles/main.scss';

function WeatherApp(props) {
    const store = useStore(MainStore, props);

    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
}

export default observer(WeatherApp);