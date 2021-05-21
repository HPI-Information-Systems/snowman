import FunctionBuilderDialogReducer from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogReducer';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const FunctionBuilderDialogMagistrate = new StoreMagistrate<FunctionBuilderDialogModel>(
  'FunctionBuilderDialogStore',
  FunctionBuilderDialogReducer
);
