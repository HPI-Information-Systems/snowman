import DatasetsAppContainer from 'apps/DatasetsApp/DatasetsApp.Container';
import { DatasetAppOwnProps } from 'apps/DatasetsApp/DatasetsAppProps';
import GenericSubApp from 'components/GenericSubApp/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';
import { dummyStoreFactory } from 'utils/storeFactory';

const DatasetsApp = (props: DatasetAppOwnProps): JSX.Element => (
  <GenericSubApp
    appId={ViewIDs.DATASETS}
    appTitle="Datasets Editor"
    createSubAppStore={dummyStoreFactory('DatasetsApp')}
  >
    <DatasetsAppContainer {...props} />
  </GenericSubApp>
);

export default DatasetsApp;
