import AlgorithmDialogReducer from 'apps/AlgorithmDialog/store/AlgorithmDialogReducer';
import { AlgorithmDialogModel } from 'apps/AlgorithmDialog/types/AlgorithmDialogModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const AlgorithmDialogStoreMagistrate = new StoreMagistrate<AlgorithmDialogModel>(
  'AlgorithmDialog',
  AlgorithmDialogReducer
);
