import GenericSubApp from 'components/GenericSubApp/GenericSubApp';
import DatasetsPageContainer from 'pages/DatasetsPage/DatasetsPage.Container';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';
import { dummyStoreFactory } from 'utils/storeFactory';

const DatasetsApp = (): JSX.Element => (
  <GenericSubApp
    appId={ViewIDs.DATASETS}
    appTitle="Datasets Editor"
    createSubAppStore={dummyStoreFactory('DatasetsApp')}
  >
    <DatasetsPageContainer />
  </GenericSubApp>
);

export default DatasetsApp;
