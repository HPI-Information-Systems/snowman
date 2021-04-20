import ExperimentsAppReducer from 'apps/ExperimentsApp/store/ExperimentsAppReducer';
import { ExperimentsAppModel } from 'apps/ExperimentsApp/types/ExperimentsAppModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { constructStore } from 'utils/storeFactory';

export const createExperimentsAppStore = (): Store<
  ExperimentsAppModel,
  SnowmanAction
> =>
  constructStore<ExperimentsAppModel>(
    'ExperimentsAppStore',
    ExperimentsAppReducer
  );
