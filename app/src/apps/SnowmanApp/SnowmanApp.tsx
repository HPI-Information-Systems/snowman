import SnowmanAppContainer from 'apps/SnowmanApp/SnowmanApp.Container';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import React from 'react';
import { Provider } from 'react-redux';

const SnowmanApp = (): JSX.Element => (
  <Provider store={SnowmanAppMagistrate.getStore()}>
    <SnowmanAppContainer />
  </Provider>
);

export default SnowmanApp;
