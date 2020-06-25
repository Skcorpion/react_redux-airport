import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { rootReducer } from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Switch>
          <Route path="/arrivals" component={App} />
          <Route path="/departures" component={App} />
        </Switch>
      </MuiPickersUtilsProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
