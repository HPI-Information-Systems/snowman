import 'components/AlgorithmDialog/AlgorithmDialog.css';

import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonTextarea,
} from '@ionic/react';
import {
  AlgorithmDialogProps,
  AlgorithmSoftKPIsTypesEnum,
} from 'components/AlgorithmDialog/AlgorithmDialogProps';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

const AlgorithmDialogView = ({
  algorithmDescription,
  algorithmName,
  isOpen,
  isAddDialog,
  clickOnCancel,
  clickOnSubmit,
  changeAlgorithmDescription,
  changeAlgorithmName,
  closeDialog,
  algorithmId,
  algorithmSoftKPIs,
  changeAlgorithmSoftKPIs,
}: AlgorithmDialogProps): JSX.Element => (
  <ModalDialog
    heading={
      isAddDialog
        ? 'Add New Matching Solution'
        : `Update Matching Solution (ID: ${algorithmId})`
    }
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
      <IonItemDivider>
        <IonLabel>SPECIFY INTEGRATION SOFT KPIS</IonLabel>
      </IonItemDivider>
      <IonItem>
        <IonLabel>Integration Time</IonLabel>
        <IonInput
          clearInput
          type="number"
          className="input-align-right"
          value={
            algorithmSoftKPIs.integrationEffort?.integrationTime ?? undefined
          }
          onIonChange={(event: IonChangeEvent): void =>
            changeAlgorithmSoftKPIs(
              AlgorithmSoftKPIsTypesEnum.integIntegrationTime,
              event
            )
          }
        />
      </IonItem>
      <IonItem>
        <IonLabel>General Costs</IonLabel>
        <IonInput
          clearInput
          type="number"
          className="input-align-right"
          value={algorithmSoftKPIs.integrationEffort?.generalCosts ?? undefined}
          onIonChange={(event: IonChangeEvent): void =>
            changeAlgorithmSoftKPIs(
              AlgorithmSoftKPIsTypesEnum.integGeneralCosts,
              event
            )
          }
        />
      </IonItem>
      <IonItemDivider>
        <IonLabel>SPECIFY CONFIGURATION SOFT KPIS</IonLabel>
      </IonItemDivider>
    </IonList>
    <div className="center button-row">
      <IonButton className="button-hugh button-padding" onClick={clickOnSubmit}>
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
