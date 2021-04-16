import { AlgorithmValuesSoftKPIs } from 'api';
import { IonChangeEvent } from 'types/IonChangeEvent';

export enum AlgorithmSoftKPIsTypesEnum {
  configMatchingSolution,
  configDomain,
  configInterfaces,
  configSupportedOSs,
  integIntegrationTime,
  integDeploymentType,
  integSolutionType,
  integUseCase,
  integGeneralCosts,
}

export interface AlgorithmDialogStateProps {
  algorithmName: string;
  isOpen: boolean;
  algorithmDescription: string;
  isAddDialog: boolean;
  algorithmId: number;
  algorithmSoftKPIs: AlgorithmValuesSoftKPIs;
}

export interface AlgorithmDialogDispatchProps {
  clickOnCancel(): void;
  closeDialog(): void;
  changeAlgorithmName(event: IonChangeEvent): void;
  changeAlgorithmDescription(event: IonChangeEvent): void;
  clickOnSubmit(): void;
  changeAlgorithmSoftKPIs(
    type: AlgorithmSoftKPIsTypesEnum,
    event: IonChangeEvent
  ): void;
}

export type AlgorithmDialogProps = AlgorithmDialogStateProps &
  AlgorithmDialogDispatchProps;
