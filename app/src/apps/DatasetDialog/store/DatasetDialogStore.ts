import DatasetDialogReducer from 'apps/DatasetDialog/store/DatasetDialogReducer';
import { DatasetDialogModel } from 'apps/DatasetDialog/types/DatasetDialogModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { constructStore } from 'utils/storeFactory';

export const constructDatasetDialogStore = (): Store<
  DatasetDialogModel,
  SnowmanAction
> =>
  constructStore<DatasetDialogModel>(
    'DatasetDialogStore',
    DatasetDialogReducer
  );
