import 'components/ModalDialog/ModalDialogStyles.css';

import { IonIcon, IonModal, IonText } from '@ionic/react';
import { ModalDialogProps } from 'components/ModalDialog/ModalDialogProps';
import { closeOutline } from 'ionicons/icons';
import React, { useRef } from 'react';

const margin = 15;

const ModalDialog = ({
  heading,
  isOpen,
  closeDialog,
  children,
  provideScrollingMechanism = true,
}: ModalDialogProps): JSX.Element => {
  const headerRef = useRef<HTMLHeadingElement>(null);
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
            ref={headerRef}
            className="center"
            style={{
              marginTop: `${margin}px`,
              marginBottom: `${margin}px`,
            }}
          >
            {heading}
          </h1>
          <IonIcon
            icon={closeOutline}
            class="modal-close-icon"
            size="large"
            onClick={(): void => closeDialog()}
          />
        </IonText>
        <div
          style={{
            position: 'relative',
            height: provideScrollingMechanism
              ? 'auto'
              : `calc(100% - ${headerRef.current?.clientHeight ?? 0}px - ${
                  3 * margin
                }px)`,
          }}
        >
          {children}
        </div>
      </div>
    </IonModal>
  );
};

export default ModalDialog;
