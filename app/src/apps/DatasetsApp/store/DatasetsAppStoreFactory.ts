import DatasetsAppReducer from 'apps/DatasetsApp/store/DatasetsAppReducer';
import { DatasetsAppModel } from 'apps/DatasetsApp/types/DatasetsAppModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const DatasetsAppStoreMagistrate = new StoreMagistrate<DatasetsAppModel>(
  'DatasetsAppStore',
  DatasetsAppReducer
);
