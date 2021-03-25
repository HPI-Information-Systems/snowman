import 'components/AlgorithmDialog/AlgorithmDialog.css';

import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import {
  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
} from 'api';
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
  implementationKnowHowLevel,
  matchingSolutionType,
  timeToConfigure,
  timeToInstall,
  isOpen,
  isAddDialog,
  clickOnCancel,
  clickOnSubmit,
  changeAlgorithmDescription,
  changeAlgorithmName,
  changeImplementationKnowHowLevel,
  changeMatchingSolutionType,
  changeTimeToConfigure,
  changeTimeToInstall,
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
      <IonItem>
        <IonLabel>Matching Solution Type</IonLabel>
        <IonSelect
          multiple={false}
          value={matchingSolutionType}
          onIonChange={changeMatchingSolutionType}
        >
          <IonSelectOption value={undefined}>---</IonSelectOption>
          {Object.keys(AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum).map(
            (aType: string): JSX.Element => (
              <IonSelectOption
                key={aType}
                value={
                  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum[
                    aType as keyof typeof AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum
                  ]
                }
              >
                {aType}
              </IonSelectOption>
            )
          )}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel>Implementation Know How Level</IonLabel>
        <IonSelect
          multiple={false}
          value={implementationKnowHowLevel}
          onIonChange={changeImplementationKnowHowLevel}
        >
          <IonSelectOption value={undefined}>---</IonSelectOption>
          {Object.keys(
            AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum
          ).map(
            (aLevel: string): JSX.Element => (
              <IonSelectOption
                key={aLevel}
                value={
                  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum[
                    aLevel as keyof typeof AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum
                  ]
                }
              >
                {aLevel}
              </IonSelectOption>
            )
          )}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel>Time To Install</IonLabel>
        <IonInput
          clearInput
          type="number"
          value={timeToInstall}
          onIonChange={changeTimeToInstall}
        />
      </IonItem>
      <IonItem>
        <IonLabel>Time To Configure</IonLabel>
        <IonInput
          clearInput
          type="number"
          value={timeToConfigure}
          onIonChange={changeTimeToConfigure}
        />
      </IonItem>
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
