import DatasetDialogContainer from 'apps/DatasetDialog/DatasetDialog.Container';
import {
  onDialogClose,
  onDialogOpen,
} from 'apps/DatasetDialog/store/DatasetDialogActions';
import { DatasetDialogStoreMagistrate } from 'apps/DatasetDialog/store/DatasetDialogStore';
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
    createSubAppStore={DatasetDialogStoreMagistrate.getStore.bind(
      DatasetDialogStoreMagistrate
    )}
    onDialogOpen={onDialogOpen}
    onDialogClose={onDialogClose}
  >
    {(ownProps: DialogProps): JSX.Element => (
      <DatasetDialogContainer {...ownProps} />
    )}
  </GenericDialog>
);

export default DatasetDialog;
