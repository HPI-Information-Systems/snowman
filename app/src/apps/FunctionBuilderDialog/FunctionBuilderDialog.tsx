import FunctionBuilderDialogContainer from 'apps/FunctionBuilderDialog/FunctionBuilderDialog.Container';
import { FunctionBuilderDialogMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogStore';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import GenericDialog from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialog';
import React from 'react';
import { EntityId } from 'types/EntityId';
import { ViewIDs } from 'types/ViewIDs';

const FunctionBuilderDialog = (): JSX.Element => (
  <GenericDialog
    getHeading={(entityId: EntityId): string =>
      entityId
        ? `Edit Existing Function (ID: ${entityId})`
        : 'Create New Function'
    }
    instanceId={ViewIDs.FunctionBuilderDialog}
    createSubAppStore={FunctionBuilderDialogMagistrate.getStore}
  >
    {(ownProps: DialogProps): JSX.Element => (
      <FunctionBuilderDialogContainer {...ownProps} />
    )}
  </GenericDialog>
);

export default FunctionBuilderDialog;
