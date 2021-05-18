import { SegmentTypeEnum } from 'apps/AlgorithmDialog/types/SegmentTypeEnum';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import { IonChangeEvent, IonRangeChangeEvent } from 'types/IonChangeEvent';

export interface AlgorithmDialogStateProps {
  algorithmName: string;
  algorithmDescription: string;
  integrationInstallationEffortExpertise: number | undefined;
  integrationInstallationEffortHRAmount: number | undefined;
  integrationDeploymentType: string[];
  availableIntegrationDeploymentTypes: string[];
  integrationSolutionType: string[];
  availableIntegrationSolutionTypes: string[];
  integrationUseCase: string[];
  availableIntegrationUseCases: string[];
  integrationGeneralCosts: number | undefined;
  configurationMatchingSolutionEffortExpertise: number | undefined;
  configurationMatchingSolutionEffortHRAmount: number | undefined;
  configurationDomainEffortExpertise: number | undefined;
  configurationDomainEffortHRAmount: number | undefined;
  configurationInterfaces: string[];
  availableConfigurationInterfaces: string[];
  configurationSupportedOSs: string[];
  availableConfigurationSupportedOSs: string[];
  expandedSegments: SegmentTypeEnum[];
}

export interface AlgorithmDialogDispatchProps {
  clickOnCancel(): void;
  changeAlgorithmName(event: IonChangeEvent): void;
  changeAlgorithmDescription(event: IonChangeEvent): void;
  changeIntegrationInstallationEffortExpertise(
    event: IonRangeChangeEvent
  ): void;
  changeIntegrationInstallationEffortHRAmount(event: IonChangeEvent): void;
  changeIntegrationDeploymentType(event: string[]): void;
  changeIntegrationSolutionType(event: string[]): void;
  changeIntegrationUseCase(event: string[]): void;
  changeIntegrationGeneralCosts(event: IonChangeEvent): void;
  changeConfigurationMatchingSolutionEffortExpertise(
    event: IonRangeChangeEvent
  ): void;
  changeConfigurationMatchingSolutionEffortHRAmount(
    event: IonChangeEvent
  ): void;
  changeConfigurationDomainEffortExpertise(event: IonRangeChangeEvent): void;
  changeConfigurationDomainEffortHRAmount(event: IonChangeEvent): void;
  changeConfigurationInterfaces(event: string[]): void;
  changeConfigurationSupportedOSs(event: string[]): void;
  clickOnSubmit(): void;
  toggleSegmentExpansion(aSegment: SegmentTypeEnum): void;
}

export type AlgorithmDialogOwnProps = DialogProps;

export type AlgorithmDialogProps = AlgorithmDialogStateProps &
  AlgorithmDialogDispatchProps &
  AlgorithmDialogOwnProps;
