import { SnowmanAction } from 'store/messages';
import { CoreStore, ImmediateStore, Store } from 'store/models';
import { AlgorithmDialogReducer } from 'store/reducers/AlgorithmDialogReducer';
import { BenchmarkConfiguratorReducer } from 'store/reducers/BenchmarkConfiguratorReducer';
import { BinaryMetricsReducer } from 'store/reducers/BinaryMetricsReducer';
import { CoreReducer } from 'store/reducers/CoreReducer';
import { DatasetDialogReducer } from 'store/reducers/DatasetDialogReducer';
import { ExperimentDialogReducer } from 'store/reducers/ExperimentDialogReducer';
import { GlobalIndicatorReducer } from 'store/reducers/GlobalIndicatorReducer';
import { InputChipReducer } from 'store/reducers/InputChipReducer';
import { NMetricsReducer } from 'store/reducers/NMetricsReducer';
import { RenderLogicReducer } from 'store/reducers/RenderLogicReducer';
import { SelectableInputReducer } from 'store/reducers/SelectableInputReducer';

import { IntersectionReducer } from './IntersectionReducer';

export const rootReducer = (state: Store, action: SnowmanAction): Store => {
  const coreState: CoreStore = CoreReducer(state?.CoreStore, action);
  const immediateState: ImmediateStore = {
    CoreStore: coreState,
    AlgorithmDialogStore: AlgorithmDialogReducer(
      state?.AlgorithmDialogStore,
      action
    ),
    DatasetDialogStore: DatasetDialogReducer(state?.DatasetDialogStore, action),
    ExperimentDialogStore: ExperimentDialogReducer(
      state?.ExperimentDialogStore,
      action
    ),
    BenchmarkConfigurationStore: BenchmarkConfiguratorReducer(
      state?.BenchmarkConfigurationStore,
      coreState,
      action
    ),
    BinaryMetricsStore: BinaryMetricsReducer(state?.BinaryMetricsStore, action),
    NMetricsStore: NMetricsReducer(state?.NMetricsStore, action),
    GlobalIndicatorStore: GlobalIndicatorReducer(
      state?.GlobalIndicatorStore,
      action
    ),
    InputChipStore: InputChipReducer(state?.InputChipStore, action),
    SelectableInputStore: SelectableInputReducer(
      state?.SelectableInputStore,
      action
    ),
    IntersectionStore: IntersectionReducer(state?.IntersectionStore, action),
  };
  return RenderLogicReducer(state?.RenderLogicStore, immediateState, action);
};
