import { SegmentTypeEnum } from 'apps/AlgorithmDialog/types/SegmentTypeEnum';

export interface AlgorithmDialogModel {
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
