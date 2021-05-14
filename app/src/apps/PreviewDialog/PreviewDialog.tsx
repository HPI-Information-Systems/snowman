import PreviewDialogContainer from 'apps/PreviewDialog/PreviewDialog.Container';
import {
  onDialogClose,
  onDialogOpen,
} from 'apps/PreviewDialog/store/PreviewDialogActions';
import { PreviewDialogStoreMagistrate } from 'apps/PreviewDialog/store/PreviewDialogStore';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import GenericDialog from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialog';
import React from 'react';
import { EntityId } from 'types/EntityId';
import { ViewIDs } from 'types/ViewIDs';

const PreviewDialog = (): JSX.Element => (
  <GenericDialog
    getHeading={(entityId: EntityId): string =>
      `Preview Contents (ID: ${entityId})`
    }
    instanceId={ViewIDs.PreviewDialog}
    createSubAppStore={PreviewDialogStoreMagistrate.getStore}
    onDialogOpen={onDialogOpen}
    onDialogClose={onDialogClose}
    provideScrollingMechanism={false}
  >
    {(ownProps: DialogProps): JSX.Element => (
      <PreviewDialogContainer {...ownProps} />
    )}
  </GenericDialog>
);

export default PreviewDialog;
