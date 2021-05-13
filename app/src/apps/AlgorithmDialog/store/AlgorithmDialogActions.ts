import { Algorithm, AlgorithmApi, AlgorithmValues, EffortParts } from 'api';
import { AlgorithmDialogActionTypes } from 'apps/AlgorithmDialog/types/AlgorithmDialogActionTypes';
import { AlgorithmDialogModel } from 'apps/AlgorithmDialog/types/AlgorithmDialogModel';
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
import RequestHandler from 'utils/requestHandler';

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

export const changeIntegrationInstallationEffort = (
  integrationInstallationEffort: EffortParts
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_INTEGRATION_INSTALLATION_EFFORT,
    payload: integrationInstallationEffort,
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
  integrationGeneralCosts: number
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_INTEGRATION_GENERAL_COSTS,
    payload: integrationGeneralCosts,
  });

export const changeConfigurationMatchingSolutionEffort = (
  configurationMatchingSolutionEffort: EffortParts
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type:
      AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_MATCHING_SOLUTION_EFFORT,
    payload: configurationMatchingSolutionEffort,
  });

export const changeConfigurationDomainEffort = (
  configurationDomainEffort: EffortParts
): easyPrimitiveActionReturn<AlgorithmDialogModel> =>
  easyPrimitiveAction<AlgorithmDialogModel>({
    type: AlgorithmDialogActionTypes.CHANGE_CONFIGURATION_DOMAIN_EFFORT,
    payload: configurationDomainEffort,
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
            changeIntegrationInstallationEffort(
              theAlgorithm.softKPIs?.integrationEffort?.installationEffort ?? {}
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
              theAlgorithm.softKPIs?.integrationEffort?.generalCosts ?? 0
            )
          );
          dispatch(
            changeConfigurationMatchingSolutionEffort(
              theAlgorithm.softKPIs?.configurationEffort?.matchingSolution ?? {}
            )
          );
          dispatch(
            changeConfigurationDomainEffort(
              theAlgorithm.softKPIs?.configurationEffort?.domain ?? {}
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
      domain: state.configurationDomainEffort,
      interfaces: state.configurationInterfaces,
      matchingSolution: state.configurationMatchingSolutionEffort,
      supportedOSs: state.configurationSupportedOSs,
    },
    integrationEffort: {
      deploymentType: state.integrationDeploymentType,
      generalCosts: state.integrationGeneralCosts,
      installationEffort: state.integrationInstallationEffort,
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
