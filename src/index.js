import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import Root from './Root';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
