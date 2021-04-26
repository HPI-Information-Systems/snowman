import DatasetsAppContainer from 'apps/DatasetsApp/DatasetsApp.Container';
import { DatasetAppOwnProps } from 'apps/DatasetsApp/DatasetsAppProps';
import { DatasetsAppStoreMagistrate } from 'apps/DatasetsApp/store/DatasetsAppStoreFactory';
import GenericSubApp from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';

const DatasetsApp = (props: DatasetAppOwnProps): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.DatasetsApp}
    appTitle="Datasets Editor"
    createSubAppStore={DatasetsAppStoreMagistrate.getStore}
  >
    <DatasetsAppContainer {...props} />
  </GenericSubApp>
);

export default DatasetsApp;
