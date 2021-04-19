import SnowmanAppContainer from 'apps/SnowmanApp/SnowmanApp.Container';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

const SnowmanApp = (): JSX.Element => (
  <Provider store={store}>
    <SnowmanAppContainer />
  </Provider>
);

export default SnowmanApp;
