import { IonButton } from '@ionic/react';
import { FunctionBuilderDialogProps } from 'apps/FunctionBuilderDialog/FunctionBuilderDialogProps';
import React from 'react';

const FunctionBuilderDialogView = ({
  clickOnCancel,
  isAddDialog,
}: FunctionBuilderDialogProps): JSX.Element => (
  <>
    <IonButton onClick={clickOnCancel}>Cancel</IonButton>
    <IonButton>{isAddDialog ? 'Add' : 'Update'}</IonButton>
  </>
);

export default FunctionBuilderDialogView;
