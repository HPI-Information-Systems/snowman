import DatasetDialogReducer from 'apps/DatasetDialog/store/DatasetDialogReducer';
import { DatasetDialogModel } from 'apps/DatasetDialog/types/DatasetDialogModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const DatasetDialogStoreMagistrate = new StoreMagistrate<DatasetDialogModel>(
  'DatasetDialogStore',
  DatasetDialogReducer
);
