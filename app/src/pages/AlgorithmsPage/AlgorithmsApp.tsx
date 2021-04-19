import GenericSubApp from 'components/GenericSubApp/GenericSubApp';
import AlgorithmsAppContainer from 'pages/AlgorithmsPage/AlgorithmsApp.Container';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';
import { dummyStoreFactory } from 'utils/storeFactory';

const AlgorithmsApp = (): JSX.Element => (
  <GenericSubApp
    appId={ViewIDs.ALGORITHMS}
    appTitle="Matching Solution Editor"
    createSubAppStore={dummyStoreFactory('AlgorithmsApp')}
  >
    <AlgorithmsAppContainer />
  </GenericSubApp>
);

export default AlgorithmsApp;
