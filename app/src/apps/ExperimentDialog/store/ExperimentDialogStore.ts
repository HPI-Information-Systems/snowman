import ExperimentDialogReducer from 'apps/ExperimentDialog/store/ExperimentDialogReducer';
import { ExperimentDialogModel } from 'apps/ExperimentDialog/types/ExperimentDialogModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { constructStore } from 'utils/storeFactory';

export const constructExperimentDialogStore = (): Store<
  ExperimentDialogModel,
  SnowmanAction
> =>
  constructStore<ExperimentDialogModel>(
    'ExperimentDialogStore',
    ExperimentDialogReducer
  );
