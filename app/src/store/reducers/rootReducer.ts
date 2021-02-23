import { combineReducers } from 'redux';
import { AddAlgorithmDialogReducer } from 'store/reducers/AddAlgorithmDialogReducer';
import { AddDatasetDialogReducer } from 'store/reducers/AddDatasetDialogReducer';
import { AddExperimentDialogReducer } from 'store/reducers/AddExperimentDialogReducer';
import { AlgorithmsReducer } from 'store/reducers/AlgorithmsReducer';
import { DatasetsReducer } from 'store/reducers/DatasetsReducer';
import { ExperimentsReducer } from 'store/reducers/ExperimentsReducer';
import { GlobalIndicatorReducer } from 'store/reducers/GlobalIndicatorReducer';
import { InputChipReducer } from 'store/reducers/InputChipReducer';
import { MetricsReducer } from 'store/reducers/MetricsReducer';

export const rootReducer = combineReducers({
  DatasetsStore: DatasetsReducer,
  ExperimentsStore: ExperimentsReducer,
  AlgorithmsStore: AlgorithmsReducer,
  AddDatasetDialogStore: AddDatasetDialogReducer,
  AddExperimentDialogStore: AddExperimentDialogReducer,
  AddAlgorithmDialogStore: AddAlgorithmDialogReducer,
  GlobalIndicatorStore: GlobalIndicatorReducer,
  MetricsStore: MetricsReducer,
  InputChipStore: InputChipReducer,
});
