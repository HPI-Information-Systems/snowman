import AlgorithmDialogContainer from 'components/AlgorithmDialog/AlgorithmDialog.Container';
import { constructAlgorithmDialogStore } from 'components/AlgorithmDialog/store/AlgorithmDialogStore';
import { DialogProps } from 'components/GenericSubInstance/GenericDialog/DialogProps';
import GenericDialog from 'components/GenericSubInstance/GenericDialog/GenericDialog';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';

const AlgorithmDialog = (): JSX.Element => (
  <GenericDialog
    heading="BliBlaBlurb"
    instanceId={ViewIDs.AlgorithmDialog}
    createSubAppStore={constructAlgorithmDialogStore}
  >
    {(ownProps: DialogProps): JSX.Element => (
      <AlgorithmDialogContainer {...ownProps} />
    )}
  </GenericDialog>
);

export default AlgorithmDialog;
