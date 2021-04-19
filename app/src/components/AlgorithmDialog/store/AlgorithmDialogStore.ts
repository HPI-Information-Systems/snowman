import AlgorithmDialogReducer from 'components/AlgorithmDialog/store/AlgorithmDialogReducer';
import { AlgorithmDialogModel } from 'components/AlgorithmDialog/types/AlgorithmDialogModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { constructStore } from 'utils/storeFactory';

export const constructAlgorithmDialogStore = (): Store<
  AlgorithmDialogModel,
  SnowmanAction
> =>
  constructStore<AlgorithmDialogModel>(
    'AlgorithmDialogStore',
    AlgorithmDialogReducer
  );
