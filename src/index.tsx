import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { rootReducer } from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { HashRouter, Switch, Route } from 'react-router-dom';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/:direction" component={App} />
        </Switch>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
