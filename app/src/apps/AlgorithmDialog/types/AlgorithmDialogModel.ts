import { EffortParts } from 'api';

export interface AlgorithmDialogModel {
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
