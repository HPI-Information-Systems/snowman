import ExperimentDialogContainer from 'apps/ExperimentDialog/ExperimentDialog.Container';
import {
  onDialogClose,
  onDialogOpen,
} from 'apps/ExperimentDialog/store/ExperimentDialogActions';
import { ExperimentDialogMagistrate } from 'apps/ExperimentDialog/store/ExperimentDialogStore';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import GenericDialog from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialog';
import React from 'react';
import { EntityId } from 'types/EntityId';
import { ViewIDs } from 'types/ViewIDs';

const ExperimentDialog = (): JSX.Element => (
  <GenericDialog
    getHeading={(entityId: EntityId): string =>
      entityId
        ? `Update Existing Experiment (ID: ${entityId})`
        : 'Add New Experiment'
    }
    instanceId={ViewIDs.ExperimentDialog}
    createSubAppStore={ExperimentDialogMagistrate.getStore}
    onDialogOpen={onDialogOpen}
    onDialogClose={onDialogClose}
  >
    {(ownProps: DialogProps): JSX.Element => (
      <ExperimentDialogContainer {...ownProps} />
    )}
  </GenericDialog>
);

export default ExperimentDialog;
