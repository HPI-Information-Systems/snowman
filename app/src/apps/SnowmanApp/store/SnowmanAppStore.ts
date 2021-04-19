import SnowmanAppReducer from 'apps/SnowmanApp/store/SnowmanAppReducer';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { constructStore } from 'utils/storeFactory';

const SnowmanAppStore = constructStore<SnowmanAppModel>(
  'SnowmanAppStore',
  SnowmanAppReducer
);

export const SnowmanAppDispatch: SnowmanDispatch<SnowmanAppModel> =
  SnowmanAppStore.dispatch;

export default SnowmanAppStore;
