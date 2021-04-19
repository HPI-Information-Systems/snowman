import ExperimentsAppContainer from 'apps/ExperimentsPage/ExperimentsApp.Container';
import { ExperimentsAppOwnProps } from 'apps/ExperimentsPage/ExperimentsAppProps';
import GenericSubApp from 'components/GenericSubInstance/GenericSubApp/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';
import { dummyStoreFactory } from 'utils/storeFactory';

const ExperimentsApp = (props: ExperimentsAppOwnProps): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.EXPERIMENTS}
    appTitle="Experiments Editor"
    createSubAppStore={dummyStoreFactory('ExperimentsApp')}
  >
    <ExperimentsAppContainer {...props} />
  </GenericSubApp>
);

export default ExperimentsApp;
