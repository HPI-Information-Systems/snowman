import ExperimentsAppContainer from 'apps/ExperimentsPage/ExperimentsApp.Container';
import { ExperimentsAppOwnProps } from 'apps/ExperimentsPage/ExperimentsAppProps';
import { createExperimentsAppStore } from 'apps/ExperimentsPage/store/ExperimentsAppStoreFactory';
import GenericSubApp from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';

const ExperimentsApp = (props: ExperimentsAppOwnProps): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.EXPERIMENTS}
    appTitle="Experiments Editor"
    createSubAppStore={createExperimentsAppStore}
  >
    <ExperimentsAppContainer {...props} />
  </GenericSubApp>
);

export default ExperimentsApp;
