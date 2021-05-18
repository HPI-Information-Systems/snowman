import { Algorithm, AlgorithmApi, AlgorithmValues } from 'api';
import { AlgorithmDialogActionTypes } from 'apps/AlgorithmDialog/types/AlgorithmDialogActionTypes';
import { AlgorithmDialogModel } from 'apps/AlgorithmDialog/types/AlgorithmDialogModel';
import { AlgorithmSegmentTypeEnum } from 'apps/AlgorithmDialog/types/AlgorithmSegmentTypeEnum';
import { doRefreshCentralResources } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { MagicNotPossibleId } from 'structs/constants';
import {
  SUCCESS_TO_ADD_NEW_ALGORITHM,
  SUCCESS_TO_UPDATE_ALGORITHM,
} from 'structs/statusMessages';
import { EntityId } from 'types/EntityId';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import { removeNaN } from 'utils/removeNaN';
import RequestHandler from 'utils/requestHandler';

export const toggleSegmentExpansion = (
  aSegment: AlgorithmSegmentTypeEnum
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.TOGGLE_SEGMENT_EXPANSION,
    payload: aSegment,
  });

export const changeAlgorithmName = (
  aName: string
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_ALGORITHM_NAME,
    payload: aName,
  });

export const changeAlgorithmDescription = (
  aDescription: string
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_ALGORITHM_DESCRIPTION,
    payload: aDescription,
  });

export const changeIntegrationInstallationEffortExpertise = (
  expertise: number | undefined
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type:
      AlgorithmDialogActionTypes.CHANGE_INTEGRATION_INSTALLATION_EFFORT_EXPERTISE,
    payload: expertise,
  });

export const changeIntegrationInstallationEffortHRAmount = (
  hrAmount: number | undefined
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type:
      AlgorithmDialogActionTypes.CHANGE_INTEGRATION_INSTALLATION_EFFORT_HR_AMOUNT,
    payload: hrAmount,
  });

export const changeIntegrationDeploymentType = (
  integrationDeploymentType: string[]
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_INTEGRATION_DEPLOYMENT_TYPE,
    payload: integrationDeploymentType,
  });

export const changeIntegrationSolutionType = (
  integrationSolutionType: string[]
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_INTEGRATION_SOLUTION_TYPE,
    payload: integrationSolutionType,
  });

export const changeIntegrationUseCase = (
  integrationUseCase: string[]
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_INTEGRATION_USE_CASE,
    payload: integrationUseCase,
  });

export const changeIntegrationGeneralCosts = (
  integrationGeneralCosts: number | undefined
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_INTEGRATION_GENERAL_COSTS,
    payload: integrationGeneralCosts,
  });

export const changeConfigurationMatchingSolutionEffortExpertise = (
  expertise: number | undefined
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type:
      AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_MATCHING_SOLUTION_EFFORT_EXPERTISE,
    payload: expertise,
  });
export const changeConfigurationMatchingSolutionEffortHRAmount = (
  hrAmount: number | undefined
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type:
      AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_MATCHING_SOLUTION_EFFORT_HR_AMOUNT,
    payload: hrAmount,
  });

export const changeConfigurationDomainEffortExpertise = (
  expertise: number | undefined
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type:
      AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_DOMAIN_EFFORT_EXPERTISE,
    payload: expertise,
  });

export const changeConfigurationDomainEffortHRAmount = (
  hrAmount: number | undefined
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type:
      AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_DOMAIN_EFFORT_HR_AMOUNT,
    payload: hrAmount,
  });

export const changeConfigurationInterfaces = (
  configurationInterfaces: string[]
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_INTERFACES,
    payload: configurationInterfaces,
  });

export const changeConfigurationSupportedOSs = (
  configurationSupportedOSs: string[]
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_SUPPORTED_OSS,
    payload: configurationSupportedOSs,
  });

const resetDialog = (): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.RESET_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const onDialogClose = (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>,
  entityId: EntityId,
  _: unknown
): void => {
  if (entityId !== null) {
    dispatch(resetDialog());
  }
};

export const prepareUpdateDialog = (
  entityId: EntityId
): SnowmanThunkAction<Promise<void>, AlgorithmDialogModel> => (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new AlgorithmApi()
        .getAlgorithm({
          algorithmId: entityId ?? MagicNotPossibleId,
        })
        .then((theAlgorithm: Algorithm): void => {
          dispatch(changeAlgorithmName(theAlgorithm.name));
          dispatch(changeAlgorithmDescription(theAlgorithm.description ?? ''));
          dispatch(
            changeIntegrationInstallationEffortExpertise(
              theAlgorithm.softKPIs?.integrationEffort?.installationEffort
                ?.expertise
            )
          );
          dispatch(
            changeIntegrationInstallationEffortHRAmount(
              theAlgorithm.softKPIs?.integrationEffort?.installationEffort
                ?.hrAmount
            )
          );
          dispatch(
            changeIntegrationDeploymentType(
              theAlgorithm.softKPIs?.integrationEffort?.deploymentType ?? []
            )
          );
          dispatch(
            changeIntegrationSolutionType(
              theAlgorithm.softKPIs?.integrationEffort?.solutionType ?? []
            )
          );
          dispatch(
            changeIntegrationUseCase(
              theAlgorithm.softKPIs?.integrationEffort?.useCase ?? []
            )
          );
          dispatch(
            changeIntegrationGeneralCosts(
              theAlgorithm.softKPIs?.integrationEffort?.generalCosts
            )
          );
          dispatch(
            changeConfigurationMatchingSolutionEffortExpertise(
              theAlgorithm.softKPIs?.configurationEffort?.matchingSolution
                ?.expertise
            )
          );
          dispatch(
            changeConfigurationMatchingSolutionEffortHRAmount(
              theAlgorithm.softKPIs?.configurationEffort?.matchingSolution
                ?.hrAmount
            )
          );
          dispatch(
            changeConfigurationDomainEffortExpertise(
              theAlgorithm.softKPIs?.configurationEffort?.domain?.expertise
            )
          );
          dispatch(
            changeConfigurationDomainEffortHRAmount(
              theAlgorithm.softKPIs?.configurationEffort?.domain?.hrAmount
            )
          );
          dispatch(
            changeConfigurationInterfaces(
              theAlgorithm.softKPIs?.configurationEffort?.interfaces ?? []
            )
          );
          dispatch(
            changeConfigurationSupportedOSs(
              theAlgorithm.softKPIs?.configurationEffort?.supportedOSs ?? []
            )
          );
        }),
    undefined,
    true
  );

export const onDialogOpen = (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>,
  entityId: EntityId,
  _: unknown
): void => {
  if (entityId !== null) {
    dispatch(prepareUpdateDialog(entityId)).then();
  }
};

const getAlgorithmValues = (state: AlgorithmDialogModel): AlgorithmValues => ({
  name: state.algorithmName,
  description: state.algorithmDescription,
  softKPIs: {
    configurationEffort: {
      domain: {
        expertise: removeNaN(state.configurationDomainEffortExpertise),
        hrAmount: removeNaN(state.configurationDomainEffortHRAmount),
      },
      interfaces: state.configurationInterfaces,
      matchingSolution: {
        hrAmount: removeNaN(state.configurationMatchingSolutionEffortHRAmount),
        expertise: removeNaN(
          state.configurationMatchingSolutionEffortExpertise
        ),
      },
      supportedOSs: state.configurationSupportedOSs,
    },
    integrationEffort: {
      deploymentType: state.integrationDeploymentType,
      generalCosts: removeNaN(state.integrationGeneralCosts),
      installationEffort: {
        hrAmount: removeNaN(state.integrationInstallationEffortHRAmount),
        expertise: removeNaN(state.integrationInstallationEffortExpertise),
      },
      solutionType: state.integrationSolutionType,
      useCase: state.integrationUseCase,
    },
  },
});

const addAlgorithm = (): SnowmanThunkAction<
  Promise<void>,
  AlgorithmDialogModel
> => async (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>,
  getState: () => AlgorithmDialogModel
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new AlgorithmApi()
        .addAlgorithm({
          algorithm: getAlgorithmValues(getState()),
        })
        .then((): void => {
          dispatch(resetDialog());
        })
        .finally((): void => {
          doCloseDialog();
          doRefreshCentralResources();
        }),
    SUCCESS_TO_ADD_NEW_ALGORITHM,
    true
  );

const updateAlgorithm = (
  algorithmId: EntityId
): SnowmanThunkAction<Promise<void>, AlgorithmDialogModel> => async (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>,
  getState: () => AlgorithmDialogModel
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new AlgorithmApi()
        .setAlgorithm({
          algorithmId: algorithmId ?? MagicNotPossibleId,
          algorithm: getAlgorithmValues(getState()),
        })
        .then((): void => dispatch(resetDialog()))
        .finally((): void => {
          doCloseDialog();
          doRefreshCentralResources();
        }),
    SUCCESS_TO_UPDATE_ALGORITHM,
    true
  );

export const addOrUpdateAlgorithm = (
  algorithmId: EntityId
): SnowmanThunkAction<Promise<void>, AlgorithmDialogModel> => async (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>
): Promise<void> => {
  if (algorithmId === null) {
    return dispatch(addAlgorithm());
  }
  return dispatch(updateAlgorithm(algorithmId));
};
