import {
  AlgorithmValuesSoftKPIsGeneral,
  AlgorithmValuesSoftKPIsInstallationCosts,
} from 'api';
import { IonChangeEvent } from 'types/IonChangeEvent';

export enum SoftKPIsGeneralTypesEnum {
  useCase,
  matchingSolutionType,
  inputFormat,
  _interface,
  costs,
}
export enum SoftKPIsInstallationTypesEnum {
  implementationKnowHowLevel,
  timeToInstall,
  os,
}

export interface AlgorithmDialogStateProps {
  algorithmName: string;
  isOpen: boolean;
  algorithmDescription: string;
  isAddDialog: boolean;
  softKPIsGeneral: AlgorithmValuesSoftKPIsGeneral;
  softKPIsInstallation: AlgorithmValuesSoftKPIsInstallationCosts;
}

export interface AlgorithmDialogDispatchProps {
  clickOnCancel(): void;
  closeDialog(): void;
  changeAlgorithmName(event: IonChangeEvent): void;
  changeAlgorithmDescription(event: IonChangeEvent): void;
  changeSoftKPIsGeneral(
    event: IonChangeEvent,
    type: SoftKPIsGeneralTypesEnum
  ): void;
  changeSoftKPIsInstallation(
    event: IonChangeEvent,
    type: SoftKPIsInstallationTypesEnum
  ): void;
  clickOnSubmit(): void;
}

export type AlgorithmDialogProps = AlgorithmDialogStateProps &
  AlgorithmDialogDispatchProps;
