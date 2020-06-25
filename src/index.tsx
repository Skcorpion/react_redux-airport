import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { rootReducer } from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/arrivals" component={App} />
        <Route path="/departures" component={App} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
