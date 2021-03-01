import 'components/AlgorithmDialog/AlgorithmDialog.css';

import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
} from '@ionic/react';
import { AlgorithmDialogProps } from 'components/AlgorithmDialog/AlgorithmDialogProps';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';

const AlgorithmDialogView = ({
  algorithmDescription,
  algorithmName,
  isOpen,
  isAddDialog,
  clickOnCancel,
  clickOnAdd,
  changeAlgorithmDescription,
  changeAlgorithmName,
  closeDialog,
}: AlgorithmDialogProps): JSX.Element => (
  <ModalDialog
    heading={`${isAddDialog ? 'Add New' : 'Update'} Matching Solution`}
    isOpen={isOpen}
    closeDialog={closeDialog}
  >
    <IonList>
      <IonItem>
        <IonLabel position="fixed">Name/ID:</IonLabel>
        <IonInput
          clearInput
          value={algorithmName}
          onIonChange={changeAlgorithmName}
          placeholder="e.g. Internal Solution"
          minlength={1}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Description:</IonLabel>
        <IonTextarea
          value={algorithmDescription}
          onIonChange={changeAlgorithmDescription}
          placeholder="e.g. Matching solution developed by a team at our company."
        />
      </IonItem>
    </IonList>
    <div className="center button-row">
      <IonButton className="button-hugh button-padding" onClick={clickOnAdd}>
        <IonIcon
          slot="start"
          icon={isAddDialog ? addCircleOutline : checkmarkCircleOutline}
        />
        {isAddDialog ? 'Add' : 'Update'}
      </IonButton>
      <IonButton
        className="button-hugh button-padding"
        onClick={clickOnCancel}
        color="light"
      >
        <IonIcon slot="start" icon={closeCircleOutline} />
        Cancel
      </IonButton>
    </div>
  </ModalDialog>
);

export default AlgorithmDialogView;