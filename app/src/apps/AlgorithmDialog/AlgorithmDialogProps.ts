import { EffortParts } from 'api';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface AlgorithmDialogStateProps {
  algorithmName: string;
  algorithmDescription: string;
  integrationInstallationEffort: EffortParts;
  integrationDeploymentType: string[];
  availableIntegrationDeploymentTypes: string[];
  integrationSolutionType: string[];
  availableIntegrationSolutionTypes: string[];
  integrationUseCase: string[];
  availableIntegrationUseCases: string[];
  integrationGeneralCosts: number;
  configurationMatchingSolutionEffort: EffortParts;
  configurationDomainEffort: EffortParts;
  configurationInterfaces: string[];
  availableConfigurationInterfaces: string[];
  configurationSupportedOSs: string[];
  availableConfigurationSupportedOSs: string[];
}

export interface AlgorithmDialogDispatchProps {
  clickOnCancel(): void;
  changeAlgorithmName(event: IonChangeEvent): void;
  changeAlgorithmDescription(event: IonChangeEvent): void;
  changeIntegrationInstallationEffort(event: EffortParts): void;
  changeIntegrationDeploymentType(event: string[]): void;
  changeIntegrationSolutionType(event: string[]): void;
  changeIntegrationUseCase(event: string[]): void;
  changeIntegrationGeneralCosts(event: IonChangeEvent): void;
  changeConfigurationMatchingSolutionEffort(event: EffortParts): void;
  changeConfigurationDomainEffort(event: EffortParts): void;
  changeConfigurationInterfaces(event: string[]): void;
  changeConfigurationSupportedOSs(event: string[]): void;
  clickOnSubmit(): void;
}

export type AlgorithmDialogOwnProps = DialogProps;

export type AlgorithmDialogProps = AlgorithmDialogStateProps &
  AlgorithmDialogDispatchProps &
  AlgorithmDialogOwnProps;
