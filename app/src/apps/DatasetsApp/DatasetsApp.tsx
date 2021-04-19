import DatasetsAppContainer from 'apps/DatasetsApp/DatasetsApp.Container';
import { DatasetAppOwnProps } from 'apps/DatasetsApp/DatasetsAppProps';
import { createDatasetsAppStore } from 'apps/DatasetsApp/store/DatasetsAppStore';
import GenericSubApp from 'components/GenericSubInstance/GenericSubApp';
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
