import { AlgorithmDialogActionTypes } from 'apps/AlgorithmDialog/types/AlgorithmDialogActionTypes';
import { AlgorithmDialogModel } from 'apps/AlgorithmDialog/types/AlgorithmDialogModel';
import { AlgorithmSegmentTypeEnum } from 'apps/AlgorithmDialog/types/AlgorithmSegmentTypeEnum';
import { CentralResourcesGenericActionsTypes } from 'apps/SnowmanApp/types/CentralResourcesGenericActionsTypes';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { uniq } from 'lodash';
import { SnowmanAction } from 'types/SnowmanAction';
import { toggleSelectionArrayMultipleSelect } from 'utils/toggleSelectionArray';

const initialState: AlgorithmDialogModel = {
  algorithmName: '',
  algorithmDescription: '',
  configurationInterfaces: [],
  configurationSupportedOSs: [],
  integrationDeploymentType: [],
  integrationGeneralCosts: undefined,
  integrationSolutionType: [],
  integrationUseCase: [],
  availableConfigurationInterfaces: ['CLI', 'GUI', 'REST API'],
  availableConfigurationSupportedOSs: ['Windows', 'MacOS', 'Linux'],
  availableIntegrationDeploymentTypes: ['Cloud', 'On-premises', 'Add-in'],
  availableIntegrationSolutionTypes: [
    'Rule Based',
    'Machine Learning',
    'Active Learning',
  ],
  availableIntegrationUseCases: ['Merging', 'Search', 'Deduplication'],
  configurationDomainEffortExpertise: undefined,
  configurationDomainEffortHRAmount: undefined,
  configurationMatchingSolutionEffortExpertise: undefined,
  configurationMatchingSolutionEffortHRAmount: undefined,
  integrationInstallationEffortExpertise: undefined,
  integrationInstallationEffortHRAmount: undefined,
  expandedSegments: [],
};

const AlgorithmDialogReducer = (
  state: AlgorithmDialogModel = initialState,
  action: SnowmanAction
): AlgorithmDialogModel => {
  switch (action.type) {
    case CentralResourcesGenericActionsTypes.REFRESHED: {
      const { algorithms } = action.payload as CentralResourcesModel;
      return {
        ...state,
        availableConfigurationInterfaces: uniq([
          ...state.availableConfigurationInterfaces,
          ...algorithms.flatMap(
            (algorithm) =>
              algorithm.softKPIs?.configurationEffort?.interfaces ?? []
          ),
        ]),
        availableConfigurationSupportedOSs: uniq([
          ...state.availableConfigurationSupportedOSs,
          ...algorithms.flatMap(
            (algorithm) =>
              algorithm.softKPIs?.configurationEffort?.supportedOSs ?? []
          ),
        ]),
        availableIntegrationDeploymentTypes: uniq([
          ...state.availableIntegrationDeploymentTypes,
          ...algorithms.flatMap(
            (algorithm) =>
              algorithm.softKPIs?.integrationEffort?.deploymentType ?? []
          ),
        ]),
        availableIntegrationSolutionTypes: uniq([
          ...state.availableIntegrationSolutionTypes,
          ...algorithms.flatMap(
            (algorithm) =>
              algorithm.softKPIs?.integrationEffort?.solutionType ?? []
          ),
        ]),
        availableIntegrationUseCases: uniq([
          ...state.availableIntegrationUseCases,
          ...algorithms.flatMap(
            (algorithm) => algorithm.softKPIs?.integrationEffort?.useCase ?? []
          ),
        ]),
      };
    }
    case AlgorithmDialogActionTypes.CHANGE_ALGORITHM_NAME:
      return {
        ...state,
        algorithmName: action.payload as string,
      };
    case AlgorithmDialogActionTypes.CHANGE_ALGORITHM_DESCRIPTION:
      return {
        ...state,
        algorithmDescription: action.payload as string,
      };
    case AlgorithmDialogActionTypes.CHANGE_INTEGRATION_INSTALLATION_EFFORT_HR_AMOUNT:
      return {
        ...state,
        integrationInstallationEffortHRAmount: action.payload as number,
      };
    case AlgorithmDialogActionTypes.CHANGE_INTEGRATION_INSTALLATION_EFFORT_EXPERTISE:
      return {
        ...state,
        integrationInstallationEffortExpertise: action.payload as number,
      };
    case AlgorithmDialogActionTypes.CHANGE_INTEGRATION_DEPLOYMENT_TYPE:
      return {
        ...state,
        integrationDeploymentType: action.payload as string[],
      };
    case AlgorithmDialogActionTypes.CHANGE_INTEGRATION_SOLUTION_TYPE:
      return {
        ...state,
        integrationSolutionType: action.payload as string[],
      };
    case AlgorithmDialogActionTypes.CHANGE_INTEGRATION_USE_CASE:
      return {
        ...state,
        integrationUseCase: action.payload as string[],
      };
    case AlgorithmDialogActionTypes.CHANGE_INTEGRATION_GENERAL_COSTS:
      return {
        ...state,
        integrationGeneralCosts: action.payload as number,
      };
    case AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_MATCHING_SOLUTION_EFFORT_HR_AMOUNT:
      return {
        ...state,
        configurationMatchingSolutionEffortHRAmount: action.payload as number,
      };
    case AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_MATCHING_SOLUTION_EFFORT_EXPERTISE:
      return {
        ...state,
        configurationMatchingSolutionEffortExpertise: action.payload as number,
      };
    case AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_DOMAIN_EFFORT_HR_AMOUNT:
      return {
        ...state,
        configurationDomainEffortHRAmount: action.payload as number,
      };
    case AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_DOMAIN_EFFORT_EXPERTISE:
      return {
        ...state,
        configurationDomainEffortExpertise: action.payload as number,
      };
    case AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_INTERFACES:
      return {
        ...state,
        configurationInterfaces: action.payload as string[],
      };
    case AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_SUPPORTED_OSS:
      return {
        ...state,
        configurationSupportedOSs: action.payload as string[],
      };
    case AlgorithmDialogActionTypes.RESET_DIALOG:
      return {
        ...initialState,
        availableConfigurationInterfaces:
          state.availableConfigurationInterfaces,
        availableConfigurationSupportedOSs:
          state.availableConfigurationSupportedOSs,
        availableIntegrationDeploymentTypes:
          state.availableIntegrationDeploymentTypes,
        availableIntegrationSolutionTypes:
          state.availableIntegrationSolutionTypes,
        availableIntegrationUseCases: state.availableIntegrationUseCases,
      };
    case AlgorithmDialogActionTypes.TOGGLE_SEGMENT_EXPANSION:
      return {
        ...state,
        expandedSegments: toggleSelectionArrayMultipleSelect(
          state.expandedSegments,
          action.payload as AlgorithmSegmentTypeEnum
        ),
      };
    default:
      return state;
  }
};

export default AlgorithmDialogReducer;
