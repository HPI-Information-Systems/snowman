import DatasetsAppReducer from 'apps/DatasetsApp/store/DatasetsAppReducer';
import { DatasetsAppModel } from 'apps/DatasetsApp/types/DatasetsAppModel';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';
import { constructStore } from 'utils/storeFactory';

export const createDatasetsAppStore = (): Store<
  DatasetsAppModel,
  SnowmanAction
> => constructStore<DatasetsAppModel>('DatasetsAppStore', DatasetsAppReducer);
