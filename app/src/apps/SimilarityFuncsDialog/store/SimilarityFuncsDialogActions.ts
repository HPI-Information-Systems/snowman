import { SimilarityFuncsDialogActionTypes } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDialogActionTypes';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { EntityId } from 'types/EntityId';
import { EntityType } from 'types/EntityType';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const changeSearchString = (
  newSearchString: string
): easyPrimitiveActionReturn<SimilarityFuncsDialogModel> =>
  easyPrimitiveAction<SimilarityFuncsDialogModel>({
    type: SimilarityFuncsDialogActionTypes.CHANGE_SEARCH_STRING,
    payload: newSearchString,
  });

export const resetDialog = (): easyPrimitiveActionReturn<SimilarityFuncsDialogModel> =>
  easyPrimitiveAction<SimilarityFuncsDialogModel>({
    type: SimilarityFuncsDialogActionTypes.RESET_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const loadInitialState = (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>,
  entityId: EntityId,
  _?: EntityType
): void => {
  dispatch(resetDialog());
};
