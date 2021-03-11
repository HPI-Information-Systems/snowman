import { combineReducers } from 'redux';
import { SnowmanAction } from 'store/messages';
import { ImmediateStore, Store } from 'store/models';
import { AddExperimentDialogReducer } from 'store/reducers/AddExperimentDialogReducer';
import { AlgorithmDialogReducer } from 'store/reducers/AlgorithmDialogReducer';
import { AlgorithmsReducer } from 'store/reducers/AlgorithmsReducer';
import { DatasetDialogReducer } from 'store/reducers/DatasetDialogReducer';
import { DatasetsReducer } from 'store/reducers/DatasetsReducer';
import { ExperimentsReducer } from 'store/reducers/ExperimentsReducer';
import { GlobalIndicatorReducer } from 'store/reducers/GlobalIndicatorReducer';
import { InputChipReducer } from 'store/reducers/InputChipReducer';
import { MetricsReducer } from 'store/reducers/MetricsReducer';
import { RenderLogicReducer } from 'store/reducers/RenderLogicReducer';

export const rootReducer = (state: Store, action: SnowmanAction): Store => {
  const immediateState: ImmediateStore = combineReducers({
    DatasetsStore: DatasetsReducer,
    ExperimentsStore: ExperimentsReducer,
    AlgorithmsStore: AlgorithmsReducer,
    DatasetDialogStore: DatasetDialogReducer,
    AddExperimentDialogStore: AddExperimentDialogReducer,
    AlgorithmDialogStore: AlgorithmDialogReducer,
    GlobalIndicatorStore: GlobalIndicatorReducer,
    MetricsStore: MetricsReducer,
    InputChipStore: InputChipReducer,
  })(state, action);
  return RenderLogicReducer(state?.RenderLogicStore, immediateState, action);
};
