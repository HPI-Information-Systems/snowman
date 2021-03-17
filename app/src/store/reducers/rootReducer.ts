import { SnowmanAction } from 'store/messages';
import { ImmediateStore, Store } from 'store/models';
import { AlgorithmDialogReducer } from 'store/reducers/AlgorithmDialogReducer';
import { AlgorithmsReducer } from 'store/reducers/AlgorithmsReducer';
import { BinaryMetricsReducer } from 'store/reducers/BinaryMetricsReducer';
import { DatasetDialogReducer } from 'store/reducers/DatasetDialogReducer';
import { DatasetsReducer } from 'store/reducers/DatasetsReducer';
import { ExperimentDialogReducer } from 'store/reducers/ExperimentDialogReducer';
import { ExperimentsReducer } from 'store/reducers/ExperimentsReducer';
import { GlobalIndicatorReducer } from 'store/reducers/GlobalIndicatorReducer';
import { InputChipReducer } from 'store/reducers/InputChipReducer';
import { RenderLogicReducer } from 'store/reducers/RenderLogicReducer';
import { SelectableInputReducer } from 'store/reducers/SelectableInputReducer';

export const rootReducer = (state: Store, action: SnowmanAction): Store => {
  const immediateState: ImmediateStore = {
    DatasetsStore: DatasetsReducer(state?.DatasetsStore, action),
    ExperimentsStore: ExperimentsReducer(state?.ExperimentsStore, action),
    AlgorithmsStore: AlgorithmsReducer(state?.AlgorithmsStore, action),
    DatasetDialogStore: DatasetDialogReducer(state?.DatasetDialogStore, action),
    ExperimentDialogStore: ExperimentDialogReducer(
      state?.ExperimentDialogStore,
      action
    ),
    AlgorithmDialogStore: AlgorithmDialogReducer(
      state?.AlgorithmDialogStore,
      action
    ),
    GlobalIndicatorStore: GlobalIndicatorReducer(
      state?.GlobalIndicatorStore,
      action
    ),
    BinaryMetricsStore: BinaryMetricsReducer(state?.BinaryMetricsStore, action),
    InputChipStore: InputChipReducer(state?.InputChipStore, action),
    SelectableInputStore: SelectableInputReducer(
      state?.SelectableInputStore,
      action
    ),
  };
  return RenderLogicReducer(state?.RenderLogicStore, immediateState, action);
};
