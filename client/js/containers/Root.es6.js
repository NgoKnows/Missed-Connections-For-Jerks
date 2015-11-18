import React, { Component, PropTypes } from 'react'

//REDUX
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';

//ROUTING
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute } from 'react-router';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

//DEV TOOLS
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import Reducer from 'flux/reducers/reducer'
import App from './App'
import Button from 'components/Reusable/Button/Button'
import Input from 'components/Reusable/Input/Input'



const finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools()
)(createStore);
const store = finalCreateStore(Reducer);

const history = createBrowserHistory();

syncReduxAndRouter(history, store);

export default class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <Router history={history}>
                        <Route path="/" component={App}>
                            <IndexRoute component={Map}/>
                            <Route path="/list" component={List} />
                            <Route path="/submit" component={Form} />
                        </Route>
                    </Router>
                </Provider>

            </div>
        )
    }
}