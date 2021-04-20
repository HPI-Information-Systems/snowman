import DatasetsAppContainer from 'apps/DatasetsApp/DatasetsApp.Container';
import { DatasetAppOwnProps } from 'apps/DatasetsApp/DatasetsAppProps';
import { createDatasetsAppStore } from 'apps/DatasetsApp/store/DatasetsAppStoreFactory';
import GenericSubApp from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';

const DatasetsApp = (props: DatasetAppOwnProps): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.DATASETS}
    appTitle="Datasets Editor"
    createSubAppStore={createDatasetsAppStore}
  >
    <DatasetsAppContainer {...props} />
  </GenericSubApp>
);

export default DatasetsApp;
