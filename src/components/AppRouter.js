import React from 'react';
import {observer} from "mobx-react";
import {Switch, Route, Redirect, HashRouter} from 'react-router-dom';
import {routes} from '../routes';
import {MAIN_ROUTE} from "../resources/consts";

function AppRouter() {
    return <HashRouter>
        <Switch>
            {routes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {<Redirect to={MAIN_ROUTE} exact/>}
        </Switch>
    </HashRouter>;
}

export default observer(AppRouter);