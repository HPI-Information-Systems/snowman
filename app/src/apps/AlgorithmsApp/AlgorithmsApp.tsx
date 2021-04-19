import AlgorithmsAppContainer from 'apps/AlgorithmsApp/AlgorithmsApp.Container';
import { AlgorithmsAppOwnProps } from 'apps/AlgorithmsApp/AlgorithmsAppProps';
import GenericSubApp from 'components/GenericSubInstance/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';
import { dummyStoreFactory } from 'utils/storeFactory';

const AlgorithmsApp = (props: AlgorithmsAppOwnProps): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.ALGORITHMS}
    appTitle="Matching Solutions Editor"
    createSubAppStore={dummyStoreFactory('AlgorithmsApp')}
  >
    <AlgorithmsAppContainer {...props} />
  </GenericSubApp>
);

export default AlgorithmsApp;
