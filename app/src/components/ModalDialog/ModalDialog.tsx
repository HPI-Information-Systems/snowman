import 'components/ModalDialog/ModalDialogStyles.css';

import { IonIcon, IonModal, IonText } from '@ionic/react';
import { ModalDialogProps } from 'components/ModalDialog/ModalDialogProps';
import { closeOutline } from 'ionicons/icons';
import React from 'react';

const margin = 15;
const fontSize = '2rem';

const ModalDialog = ({
  heading,
  isOpen,
  closeDialog,
  children,
  provideScrollingMechanism = true,
}: ModalDialogProps): JSX.Element => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={closeDialog}>
      <div
        className="modal-content"
        style={{
          marginTop: `${margin}px`,
          overflowY: provideScrollingMechanism ? 'auto' : 'hidden',
          height: provideScrollingMechanism ? 'auto' : `100%`,
        }}
      >
        <IonText color="dark">
          <h1
            className="center"
            style={{
              marginTop: `${margin}px`,
              marginBottom: `${margin}px`,
              fontSize,
            }}
          >
            {heading}
          </h1>
          <IonIcon
            icon={closeOutline}
            className="modal-close-icon"
            size="large"
            onClick={(): void => closeDialog()}
          />
        </IonText>
        <div
          style={{
            position: 'relative',
            height: provideScrollingMechanism
              ? 'auto'
              : `calc(100% - ${fontSize} - ${3 * margin}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </IonModal>
  );
};

export default ModalDialog;
