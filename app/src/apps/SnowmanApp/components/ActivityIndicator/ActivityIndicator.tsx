import ActivityIndicatorContainer from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator.Container';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import React from 'react';
import { Provider } from 'react-redux';

const ActivityIndicator = (): JSX.Element => (
  <Provider store={SnowmanAppMagistrate.getStore()}>
    <ActivityIndicatorContainer />
  </Provider>
);

export default ActivityIndicator;
