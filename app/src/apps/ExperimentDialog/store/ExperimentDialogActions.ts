import { ExperimentDialogActionTypes } from 'apps/ExperimentDialog/types/ExperimentDialogActionTypes';
import { ExperimentDialogModel } from 'apps/ExperimentDialog/types/ExperimentDialogModel';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const resetDialog = (): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.RESET_DIALOG,
    // payload is not used
    payload: false,
  });

export const changeExperimentName = (
  aName: string
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_EXPERIMENT_NAME,
    payload: aName,
  });

export const changeExperimentDescription = (
  aDescription: string
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_EXPERIMENT_DESCRIPTION,
    payload: aDescription,
  });

export const changeFileFormat = (
  aFormat: experimentFileFormatEnum
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_EXPERIMENT_FORMAT,
    payload: aFormat,
  });

export const clickOnMatchingSolutionTag = (
  aTag: string
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CLICK_ON_MATCHING_SOLUTION_TAG,
    payload: aTag,
  });

export const changeSelectedFiles = (
  files: File[]
): easyPrimitiveActionReturn<ExperimentDialogModel> =>
  easyPrimitiveAction<ExperimentDialogModel>({
    type: ExperimentDialogActionTypes.CHANGE_SELECTED_FILES,
    payload: files,
  });
