import PreviewDialogReducer from 'apps/PreviewDialog/store/PreviewDialogReducer';
import { PreviewDialogModel } from 'apps/PreviewDialog/types/PreviewDialogModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const PreviewDialogStoreMagistrate = new StoreMagistrate<PreviewDialogModel>(
  'PreviewDialogStore',
  PreviewDialogReducer
);
