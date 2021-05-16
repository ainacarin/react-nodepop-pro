import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { configureClient } from "./api/client";
import storage from "./utils/storage";
import "./index.css";
import App from "./components/app";
import { Provider } from 'react-redux';
import { store } from "./store/store";

const accessToken = storage.get("auth");
configureClient({ accessToken });

ReactDOM.render(
  <>
    <Router>
      <Provider store={ store }>
        <App isInitiallyLogged={!!accessToken} />
      </Provider>
    </Router>
  </>,
  document.getElementById("root")
);
