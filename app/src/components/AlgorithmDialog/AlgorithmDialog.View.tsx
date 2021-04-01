import 'components/AlgorithmDialog/AlgorithmDialog.css';

import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import {
  AlgorithmValuesSoftKPIsGeneralInputFormatEnum,
  AlgorithmValuesSoftKPIsGeneralInterfaceEnum,
  AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum,
  AlgorithmValuesSoftKPIsGeneralUseCaseEnum,
  AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsInstallationCostsOsEnum,
} from 'api';
import {
  AlgorithmDialogProps,
  SoftKPIsGeneralTypesEnum,
  SoftKPIsInstallationTypesEnum,
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
  softKPIsGeneral,
  changeSoftKPIsGeneral,
  softKPIsInstallation,
  changeSoftKPIsInstallation,
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
      <IonItemDivider>
        <IonLabel>SPECIFY GENERAL SOFT KPIS</IonLabel>
      </IonItemDivider>
      <IonItem>
        <IonLabel>Solution Use Case</IonLabel>
        <IonSelect
          multiple={true}
          value={softKPIsGeneral.useCase}
          onIonChange={(event: IonChangeEvent): void =>
            changeSoftKPIsGeneral(event, SoftKPIsGeneralTypesEnum.useCase)
          }
        >
          <IonSelectOption value={undefined}>-</IonSelectOption>
          {Object.keys(AlgorithmValuesSoftKPIsGeneralUseCaseEnum).map(
            (aType: string): JSX.Element => (
              <IonSelectOption
                key={aType}
                value={
                  AlgorithmValuesSoftKPIsGeneralUseCaseEnum[
                    aType as keyof typeof AlgorithmValuesSoftKPIsGeneralUseCaseEnum
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
        <IonLabel>Matching Solution Type</IonLabel>
        <IonSelect
          multiple={false}
          value={softKPIsGeneral.matchingSolutionType}
          onIonChange={(event: IonChangeEvent): void =>
            changeSoftKPIsGeneral(
              event,
              SoftKPIsGeneralTypesEnum.matchingSolutionType
            )
          }
        >
          <IonSelectOption value={undefined}>-</IonSelectOption>
          {Object.keys(
            AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum
          ).map(
            (aType: string): JSX.Element => (
              <IonSelectOption
                key={aType}
                value={
                  AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum[
                    aType as keyof typeof AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum
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
        <IonLabel>Solution Input Format</IonLabel>
        <IonSelect
          multiple={true}
          value={softKPIsGeneral.inputFormat}
          onIonChange={(event: IonChangeEvent): void =>
            changeSoftKPIsGeneral(event, SoftKPIsGeneralTypesEnum.inputFormat)
          }
        >
          <IonSelectOption value={undefined}>-</IonSelectOption>
          {Object.keys(AlgorithmValuesSoftKPIsGeneralInputFormatEnum).map(
            (aType: string): JSX.Element => (
              <IonSelectOption
                key={aType}
                value={
                  AlgorithmValuesSoftKPIsGeneralInputFormatEnum[
                    aType as keyof typeof AlgorithmValuesSoftKPIsGeneralInputFormatEnum
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
        <IonLabel>Solution Interfaces</IonLabel>
        <IonSelect
          multiple={true}
          value={softKPIsGeneral._interface}
          onIonChange={(event: IonChangeEvent): void =>
            changeSoftKPIsGeneral(event, SoftKPIsGeneralTypesEnum._interface)
          }
        >
          <IonSelectOption value={undefined}>-</IonSelectOption>
          {Object.keys(AlgorithmValuesSoftKPIsGeneralInterfaceEnum).map(
            (aType: string): JSX.Element => (
              <IonSelectOption
                key={aType}
                value={
                  AlgorithmValuesSoftKPIsGeneralInterfaceEnum[
                    aType as keyof typeof AlgorithmValuesSoftKPIsGeneralInterfaceEnum
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
        <IonLabel>Procurement Cost</IonLabel>
        <IonInput
          clearInput
          type="number"
          className="input-align-right"
          value={softKPIsGeneral.costs}
          onIonChange={(event: IonChangeEvent): void =>
            changeSoftKPIsGeneral(event, SoftKPIsGeneralTypesEnum.costs)
          }
        />
      </IonItem>
      <IonItemDivider>
        <IonLabel>SPECIFY INSTALLATION COSTS</IonLabel>
      </IonItemDivider>
      <IonItem>
        <IonLabel>Implementation Know How Level</IonLabel>
        <IonSelect
          multiple={false}
          value={softKPIsInstallation.implementationKnowHowLevel}
          onIonChange={(event: IonChangeEvent): void =>
            changeSoftKPIsInstallation(
              event,
              SoftKPIsInstallationTypesEnum.implementationKnowHowLevel
            )
          }
        >
          <IonSelectOption value={undefined}>-</IonSelectOption>
          {Object.keys(
            AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum
          ).map(
            (aType: string): JSX.Element => (
              <IonSelectOption
                key={aType}
                value={
                  AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum[
                    aType as keyof typeof AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum
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
        <IonLabel>Time To Install</IonLabel>
        <IonInput
          clearInput
          type="number"
          className="input-align-right"
          value={softKPIsInstallation.timeToInstall}
          onIonChange={(event: IonChangeEvent): void =>
            changeSoftKPIsInstallation(
              event,
              SoftKPIsInstallationTypesEnum.timeToInstall
            )
          }
        />
      </IonItem>
      <IonItem>
        <IonLabel>Supported Operating Systems</IonLabel>
        <IonSelect
          multiple={true}
          value={softKPIsInstallation.os}
          onIonChange={(event: IonChangeEvent): void =>
            changeSoftKPIsInstallation(event, SoftKPIsInstallationTypesEnum.os)
          }
        >
          <IonSelectOption value={undefined}>-</IonSelectOption>
          {Object.keys(AlgorithmValuesSoftKPIsInstallationCostsOsEnum).map(
            (aType: string): JSX.Element => (
              <IonSelectOption
                key={aType}
                value={
                  AlgorithmValuesSoftKPIsInstallationCostsOsEnum[
                    aType as keyof typeof AlgorithmValuesSoftKPIsInstallationCostsOsEnum
                  ]
                }
              >
                {aType}
              </IonSelectOption>
            )
          )}
        </IonSelect>
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
