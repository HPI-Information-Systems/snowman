import SimilarityFuncsDialogReducer from 'apps/SimilarityFuncsDialog/store/SimilarityFuncsDialogReducer';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const SimilarityFuncsDialogMagistrate = new StoreMagistrate<SimilarityFuncsDialogModel>(
  'SimilarityFuncsDialogStore',
  SimilarityFuncsDialogReducer
);
