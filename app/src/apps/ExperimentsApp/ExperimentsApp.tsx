import ExperimentsAppContainer from 'apps/ExperimentsApp/ExperimentsApp.Container';
import { ExperimentsAppOwnProps } from 'apps/ExperimentsApp/ExperimentsAppProps';
import { ExperimentsAppMagistrate } from 'apps/ExperimentsApp/store/ExperimentsAppStoreFactory';
import GenericSubApp from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';

const ExperimentsApp = (props: ExperimentsAppOwnProps): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.ExperimentsApp}
    appTitle="Experiments Editor"
    createSubAppStore={ExperimentsAppMagistrate.getStore}
  >
    <ExperimentsAppContainer {...props} />
  </GenericSubApp>
);

export default ExperimentsApp;
