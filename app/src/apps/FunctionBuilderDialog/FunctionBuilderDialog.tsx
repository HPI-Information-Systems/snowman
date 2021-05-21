import FunctionBuilderDialogContainer from 'apps/FunctionBuilderDialog/FunctionBuilderDialog.Container';
import {
  cleanUp,
  loadInitialState,
} from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogStore';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import GenericDialog from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialog';
import React from 'react';
import { EntityId } from 'types/EntityId';

const FunctionBuilderDialog = (): JSX.Element => (
  <GenericDialog
    getHeading={(entityId: EntityId): string =>
      entityId
        ? `Edit Existing Function (ID: ${entityId})`
        : 'Create New Similarity Function'
    }
    instanceId={-1}
    createSubAppStore={FunctionBuilderDialogMagistrate.getStore}
    onDialogOpen={loadInitialState}
    onDialogClose={cleanUp}
  >
    {(ownProps: DialogProps): JSX.Element => (
      <FunctionBuilderDialogContainer {...ownProps} />
    )}
  </GenericDialog>
);

export default FunctionBuilderDialog;
