import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import rootReducer from "./store/reducers/rootReducer";

import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import setToken from './utils/setToken'
import { getUser } from './store/actions/userActions'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  if (localStorage.token) {
    setToken(localStorage.token)
    store.dispatch(
      getUser()
    )
  }

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
