import {CUBE_ROUTE, MAIN_ROUTE} from './resources/consts';
import Main from "./pages/Main";

export const routes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: CUBE_ROUTE,
        Component: `Cube`
    }
]
