import ExperimentsAppReducer from 'apps/ExperimentsPage/store/ExperimentsAppReducer';
import { ExperimentsAppModel } from 'apps/ExperimentsPage/types/ExperimentsAppModel';
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
