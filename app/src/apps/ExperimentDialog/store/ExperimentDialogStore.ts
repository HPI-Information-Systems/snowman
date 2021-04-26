import ExperimentDialogReducer from 'apps/ExperimentDialog/store/ExperimentDialogReducer';
import { ExperimentDialogModel } from 'apps/ExperimentDialog/types/ExperimentDialogModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const ExperimentDialogMagistrate = new StoreMagistrate<ExperimentDialogModel>(
  'ExperimentDialogStore',
  ExperimentDialogReducer
);

