import { SimilarityFuncsDialogActionTypes } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDialogActionTypes';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
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
