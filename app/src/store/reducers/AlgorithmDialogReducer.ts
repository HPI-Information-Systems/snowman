import {
  Algorithm,
  AlgorithmValuesSoftKPIsGeneral,
  AlgorithmValuesSoftKPIsGeneralInputFormatEnum,
  AlgorithmValuesSoftKPIsGeneralInterfaceEnum,
  AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum,
  AlgorithmValuesSoftKPIsGeneralUseCaseEnum,
  AlgorithmValuesSoftKPIsInstallationCosts,
  AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsInstallationCostsOsEnum,
} from 'api';
import {
  SoftKPIsGeneralTypesEnum,
  SoftKPIsInstallationTypesEnum,
} from 'components/AlgorithmDialog/AlgorithmDialogProps';
import { AlgorithmDialogStoreActionTypes as DialogActions } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { AlgorithmDialogStore } from 'store/models';
import { DialogTypes } from 'types/DialogTypes';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';

const initialState: AlgorithmDialogStore = {
  isOpen: false,
  algorithmId: null,
  algorithmName: '',
  algorithmDescription: '',
  dialogType: DialogTypes.ADD_DIALOG,
  softKPIsGeneral: {},
  softKPIsInstallation: {},
};

export const AlgorithmDialogReducer = (
  state: AlgorithmDialogStore = initialState,
  action: SnowmanAction
): AlgorithmDialogStore => {
  switch (action.type) {
    case DialogActions.OPEN_ADD_DIALOG:
      return {
        ...state,
        isOpen: true,
        dialogType: DialogTypes.ADD_DIALOG,
      };
    case DialogActions.OPEN_CHANGE_DIALOG:
      return {
        ...state,
        isOpen: true,
        algorithmId: (action.payload as Algorithm).id,
        algorithmName: (action.payload as Algorithm).name,
        algorithmDescription: (action.payload as Algorithm).description ?? '',
        softKPIsGeneral: (action.payload as Algorithm).softKPIs?.general ?? {},
        softKPIsInstallation:
          (action.payload as Algorithm).softKPIs?.installationCosts ?? {},
        dialogType: DialogTypes.CHANGE_DIALOG,
      };
    case DialogActions.CLOSE_DIALOG:
      if (state.dialogType === DialogTypes.ADD_DIALOG)
        // Only keep current state for add dialog
        return {
          ...state,
          isOpen: false,
        };
      else {
        return initialState;
      }
    case DialogActions.CHANGE_ALGORITHM_NAME:
      return {
        ...state,
        algorithmName: action.payload as string,
      };
    case DialogActions.CHANGE_ALGORITHM_DESCRIPTION:
      return {
        ...state,
        algorithmDescription: action.payload as string,
      };
    case DialogActions.UPDATE_SOFT_KPIS_GENERAL:
      return {
        ...state,
        softKPIsGeneral: SoftKPIsGeneralReducer(state.softKPIsGeneral, action),
      };
    case DialogActions.UPDATE_SOFT_KPIS_INSTALLATION:
      return {
        ...state,
        softKPIsInstallation: SoftKPIsInstallationReducer(
          state.softKPIsInstallation,
          action
        ),
      };
    case DialogActions.RESET_DIALOG:
      return initialState;
    default:
      return state;
  }
};

const SoftKPIsGeneralReducer = (
  state: AlgorithmValuesSoftKPIsGeneral,
  action: SnowmanAction
): AlgorithmValuesSoftKPIsGeneral => {
  switch (action.payload as SoftKPIsGeneralTypesEnum) {
    case SoftKPIsGeneralTypesEnum.useCase:
      return {
        ...state,
        useCase: action.optionalPayload as AlgorithmValuesSoftKPIsGeneralUseCaseEnum[],
      };
    case SoftKPIsGeneralTypesEnum.matchingSolutionType:
      return {
        ...state,
        matchingSolutionType: action.optionalPayload as AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum,
      };
    case SoftKPIsGeneralTypesEnum.inputFormat:
      return {
        ...state,
        inputFormat: action.optionalPayload as AlgorithmValuesSoftKPIsGeneralInputFormatEnum[],
      };
    case SoftKPIsGeneralTypesEnum._interface:
      return {
        ...state,
        _interface: action.optionalPayload as AlgorithmValuesSoftKPIsGeneralInterfaceEnum[],
      };
    case SoftKPIsGeneralTypesEnum.costs:
      return {
        ...state,
        costs: parseInputToNumberOrUndef(
          action.optionalPayload as string | undefined
        ),
      };
    default:
      return state;
  }
};

const SoftKPIsInstallationReducer = (
  state: AlgorithmValuesSoftKPIsInstallationCosts,
  action: SnowmanAction
): AlgorithmValuesSoftKPIsInstallationCosts => {
  switch (action.payload as SoftKPIsInstallationTypesEnum) {
    case SoftKPIsInstallationTypesEnum.implementationKnowHowLevel:
      return {
        ...state,
        implementationKnowHowLevel: action.optionalPayload as AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum,
      };
    case SoftKPIsInstallationTypesEnum.timeToInstall:
      return {
        ...state,
        timeToInstall: parseInputToNumberOrUndef(
          action.optionalPayload as string | undefined
        ),
      };
    case SoftKPIsInstallationTypesEnum.os:
      return {
        ...state,
        os: action.optionalPayload as AlgorithmValuesSoftKPIsInstallationCostsOsEnum[],
      };
    default:
      return state;
  }
};
