import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './components/app';

const accessToken = storage.get('auth');
configureClient({ accessToken });

ReactDOM.render(
  <>
    <Router>
      <App isInitiallyLogged={!!accessToken} />
    </Router>
  </>,
  document.getElementById('root')
);
