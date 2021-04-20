import DatasetDialogContainer from 'apps/DatasetDialog/DatasetDialog.Container';
import { prepareUpdateDialog } from 'apps/DatasetDialog/store/DatasetDialogActions';
import { constructDatasetDialogStore } from 'apps/DatasetDialog/store/DatasetDialogStore';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import GenericDialog from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialog';
import React from 'react';
import { EntityId } from 'types/EntityId';
import { ViewIDs } from 'types/ViewIDs';

const DatasetDialog = (): JSX.Element => (
  <GenericDialog
    getHeading={(entityId: EntityId): string =>
      entityId ? `Update Existing Dataset (ID: ${entityId})` : 'Add New Dataset'
    }
    instanceId={ViewIDs.DatasetDialog}
    createSubAppStore={constructDatasetDialogStore}
    loadInitialState={prepareUpdateDialog}
  >
    {(ownProps: DialogProps): JSX.Element => (
      <DatasetDialogContainer {...ownProps} />
    )}
  </GenericDialog>
);

export default DatasetDialog;
