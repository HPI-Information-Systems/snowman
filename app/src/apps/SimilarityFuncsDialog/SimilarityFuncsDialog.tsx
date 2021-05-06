import SimilarityFuncsDialogContainer from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialog.Container';
import { loadSimilarityThresholdFunctionsOnDialogOpen } from 'apps/SimilarityFuncsDialog/store/SimilarityFuncsDialogActions';
import { SimilarityFuncsDialogMagistrate } from 'apps/SimilarityFuncsDialog/store/SimilarityFuncsDialogStore';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import GenericDialog from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialog';
import React from 'react';
import { EntityId } from 'types/EntityId';
import { ViewIDs } from 'types/ViewIDs';

const SimilarityFuncsDialog = (): JSX.Element => (
  <GenericDialog
    getHeading={(entityId: EntityId): string =>
      entityId
        ? `Manage Similarity Functions (ID: ${entityId})`
        : // it will never happen that we open the dialog without an entity id
          'Unknown'
    }
    instanceId={ViewIDs.SimilarityFuncsDialog}
    createSubAppStore={SimilarityFuncsDialogMagistrate.getStore}
    onDialogOpen={loadSimilarityThresholdFunctionsOnDialogOpen}
  >
    {(ownProps: DialogProps): JSX.Element => (
      <SimilarityFuncsDialogContainer {...ownProps} />
    )}
  </GenericDialog>
);

export default SimilarityFuncsDialog;
