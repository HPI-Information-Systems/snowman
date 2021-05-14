import SnowmanAppReducer from 'apps/SnowmanApp/store/SnowmanAppReducer';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { StoreMagistrate } from 'utils/storeFactory';

export const SnowmanAppMagistrate = new StoreMagistrate<SnowmanAppModel>(
  'SnowmanAppStore',
  SnowmanAppReducer
);

export const SnowmanAppDispatch: SnowmanDispatch<SnowmanAppModel> = SnowmanAppMagistrate.getStore()
  .dispatch;
