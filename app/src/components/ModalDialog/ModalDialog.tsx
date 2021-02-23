import 'components/ModalDialog/ModalDialogStyles.css';

import { IonModal, IonText } from '@ionic/react';
import { ModalDialogProps } from 'components/ModalDialog/ModalDialogProps';
import React from 'react';

const ModalDialog = ({
  heading,
  isOpen,
  closeDialog,
  children,
}: ModalDialogProps): JSX.Element => (
  <IonModal isOpen={isOpen} onDidDismiss={closeDialog}>
    <div className="modal-content">
      <IonText color="dark">
        <h1 className="center">{heading}</h1>
      </IonText>
      <div>{children}</div>
    </div>
  </IonModal>
);

export default ModalDialog;
