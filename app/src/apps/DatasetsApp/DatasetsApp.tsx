import DatasetsAppContainer from 'apps/DatasetsApp/DatasetsApp.Container';
import { DatasetAppOwnProps } from 'apps/DatasetsApp/DatasetsAppProps';
import GenericSubApp from 'components/GenericSubInstance/GenericSubApp/GenericSubApp';
import { createDatasetsAppStore } from 'apps/DatasetsApp/store/DatasetsAppStore';
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
