import GenericSubApp from 'components/GenericSubApp/GenericSubApp';
import ExperimentsPageContainer from 'pages/ExperimentsPage/ExperimentsPage.Container';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';
import { dummyStoreFactory } from 'utils/storeFactory';

const ExperimentsApp = (): JSX.Element => (
  <GenericSubApp
    appId={ViewIDs.EXPERIMENTS}
    appTitle="Experiments Editor"
    createSubAppStore={dummyStoreFactory('ExperimentsApp')}
  >
    <ExperimentsPageContainer />
  </GenericSubApp>
);

export default ExperimentsApp;
