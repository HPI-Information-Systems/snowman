import {
  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
} from 'api';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface AlgorithmDialogStateProps {
  algorithmName: string;
  isOpen: boolean;
  algorithmDescription: string;
  isAddDialog: boolean;
  implementationKnowHowLevel:
    | AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum
    | undefined;
  matchingSolutionType:
    | AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum
    | undefined;
  timeToInstall: number | undefined;
  timeToConfigure: number | undefined;
}

export interface AlgorithmDialogDispatchProps {
  clickOnCancel(): void;
  closeDialog(): void;
  changeAlgorithmName(event: IonChangeEvent): void;
  changeAlgorithmDescription(event: IonChangeEvent): void;
  changeImplementationKnowHowLevel(event: IonChangeEvent): void;
  changeMatchingSolutionType(event: IonChangeEvent): void;
  changeTimeToInstall(event: IonChangeEvent): void;
  changeTimeToConfigure(event: IonChangeEvent): void;
  clickOnSubmit(): void;
}

export type AlgorithmDialogProps = AlgorithmDialogStateProps &
  AlgorithmDialogDispatchProps;
