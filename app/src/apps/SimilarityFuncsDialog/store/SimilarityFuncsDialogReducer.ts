import { SimilarityFuncsDialogActionTypes } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDialogActionTypes';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: SimilarityFuncsDialogModel = {
  searchString: '',
};

const SimilarityFuncsDialogReducer = (
  state: SimilarityFuncsDialogModel = initialState,
  action: SnowmanAction
): SimilarityFuncsDialogModel => {
  switch (action.type) {
    case SimilarityFuncsDialogActionTypes.CHANGE_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload as string,
      };
    case SimilarityFuncsDialogActionTypes.RESET_DIALOG:
      return initialState;
    default:
      return state;
  }
};

export default SimilarityFuncsDialogReducer;
