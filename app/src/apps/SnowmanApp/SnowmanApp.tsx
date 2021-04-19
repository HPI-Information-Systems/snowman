import SnowmanAppContainer from 'apps/SnowmanApp/SnowmanApp.Container';
import SnowmanAppStore from 'apps/SnowmanApp/store/SnowmanAppStore';
import React from 'react';
import { Provider } from 'react-redux';

const SnowmanApp = (): JSX.Element => (
  <Provider store={SnowmanAppStore}>
    <SnowmanAppContainer />
  </Provider>
);

export default SnowmanApp;
