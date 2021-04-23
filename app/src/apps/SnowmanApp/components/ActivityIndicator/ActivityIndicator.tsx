import ActivityIndicatorContainer from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator.Container';
import SnowmanAppStore from 'apps/SnowmanApp/store/SnowmanAppStore';
import React from 'react';
import { Provider } from 'react-redux';

const ActivityIndicator = (): JSX.Element => (
  <Provider store={SnowmanAppStore}>
    <ActivityIndicatorContainer />
  </Provider>
);

export default ActivityIndicator;
