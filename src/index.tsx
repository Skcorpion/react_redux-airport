import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { rootReducer } from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { HashRouter, Switch, Route } from 'react-router-dom';
import FlightDetails from './components/FlightDetails/FlightDetails';
import Home from './components/Home/Home';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:direction" component={App} />
          <Route exact path="/:direction/:flightId" component={FlightDetails} />
        </Switch>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
