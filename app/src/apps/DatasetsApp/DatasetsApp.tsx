import DatasetsAppContainer from 'apps/DatasetsApp/DatasetsApp.Container';
import { DatasetAppOwnProps } from 'apps/DatasetsApp/DatasetsAppProps';
import { checkConsistency } from 'apps/DatasetsApp/store/DatasetsAppActions';
import { createDatasetsAppStore } from 'apps/DatasetsApp/store/DatasetsAppStoreFactory';
import GenericSubApp from 'components/GenericSubInstance/GenericSubApp/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';

const DatasetsApp = (props: DatasetAppOwnProps): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.DATASETS}
    appTitle="Datasets Editor"
    createSubAppStore={createDatasetsAppStore}
    consistencyUpdater={checkConsistency}
  >
    <DatasetsAppContainer {...props} />
  </GenericSubApp>
);

export default DatasetsApp;
