import React from 'react';
import {observer} from "mobx-react";
import {Switch, Route, Redirect, Router} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {routes} from '../routes';
import {MAIN_ROUTE} from "../resources/consts";

const history = createBrowserHistory();

window.currentHistory = history

function AppRouter() {
    return <Router history={history}>
        <Switch>
            {routes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {<Redirect to={MAIN_ROUTE} exact/>}
        </Switch>
    </Router>
}

export default observer(AppRouter);