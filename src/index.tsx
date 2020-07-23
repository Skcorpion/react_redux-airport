import React from 'react';
import ReactDOM from 'react-dom';
import { rootReducer } from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { HashRouter } from 'react-router-dom';
import App from './components/App';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
