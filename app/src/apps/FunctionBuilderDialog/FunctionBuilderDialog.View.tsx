import { IonButton } from '@ionic/react';
import { FunctionBuilderDialogProps } from 'apps/FunctionBuilderDialog/FunctionBuilderDialogProps';
import React from 'react';

const FunctionBuilderDialogView = ({
  clickOnCancel,
}: FunctionBuilderDialogProps): JSX.Element => (
  <>
    <IonButton onClick={clickOnCancel}>Cancel</IonButton>
  </>
);

export default FunctionBuilderDialogView;
