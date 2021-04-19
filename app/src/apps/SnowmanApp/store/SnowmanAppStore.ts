import SnowmanAppReducer from 'apps/SnowmanApp/store/SnowmanAppReducer';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { constructStore } from 'utils/storeFactory';

const SnowmanAppStore = constructStore<SnowmanAppModel>(
  'SnowmanAppStore',
  SnowmanAppReducer
);

export const SnowmanAppDispatch = SnowmanAppStore.dispatch;

export default SnowmanAppStore;
