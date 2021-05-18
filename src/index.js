import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { configureClient } from "./api/client";
import storage from "./utils/storage";
import "./index.css";
import App from "./components/app";
import { Provider } from "react-redux";
import { configureStore } from "./store/store";

const accessToken = storage.get("auth");
configureClient({ accessToken });

const store = configureStore({
  preloadedState: {
    auth: !!accessToken,
    adverts: [],
    ui: {
      loading: false,
      error: ''
    }
  },
});

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);
