import ExperimentsAppReducer from 'apps/ExperimentsApp/store/ExperimentsAppReducer';
import { ExperimentsAppModel } from 'apps/ExperimentsApp/types/ExperimentsAppModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const ExperimentsAppMagistrate = new StoreMagistrate<ExperimentsAppModel>(
  'ExperimentsAppStore',
  ExperimentsAppReducer
);
