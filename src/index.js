import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import { configureClient } from "./api/client";
import storage from "./utils/storage";
import "./index.css";
import App from "./components/app";
import { Provider } from "react-redux";
import { configureStore } from "./store/store";

const accessToken = storage.get("auth");
configureClient({ accessToken });

const history = createBrowserHistory();
const store = configureStore({
  preloadedState: {
    auth: !!accessToken,
    adverts: [],
    ui: {
      loading: false,
      error: ''
    }
  },
  history
});

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);
