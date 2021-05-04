import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: SimilarityFuncsDialogModel = {
  similarityFuncs: [],
};

const SimilarityFuncsDialogReducer = (
  state: SimilarityFuncsDialogModel = initialState,
  action: SnowmanAction
): SimilarityFuncsDialogModel => {
  switch (action.type) {
    default:
      return state;
  }
};

export default SimilarityFuncsDialogReducer;
