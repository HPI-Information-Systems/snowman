import AlgorithmDialogContainer from 'apps/AlgorithmDialog/AlgorithmDialog.Container';
import { constructAlgorithmDialogStore } from 'apps/AlgorithmDialog/store/AlgorithmDialogStore';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import GenericDialog from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialog';
import React from 'react';
import { EntityId } from 'types/EntityId';
import { ViewIDs } from 'types/ViewIDs';

const AlgorithmDialog = (): JSX.Element => (
  <GenericDialog
    getHeading={(entityId: EntityId): string =>
      entityId
        ? `Update Existing Matching Solution (ID: ${entityId})`
        : 'Add New Matching Solution'
    }
    instanceId={ViewIDs.AlgorithmDialog}
    createSubAppStore={constructAlgorithmDialogStore}
  >
    {(ownProps: DialogProps): JSX.Element => (
      <AlgorithmDialogContainer {...ownProps} />
    )}
  </GenericDialog>
);

export default AlgorithmDialog;
