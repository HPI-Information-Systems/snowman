import { SnowmanAction } from 'store/messages';
import {
  BenchmarkConfigurationStore,
  CoreStore,
  ImmediateStore,
} from 'store/models';
import { BenchmarkConfiguratorReducer } from 'store/reducers/BenchmarkConfiguratorReducer';
import { BinaryMetricsReducer } from 'store/reducers/BinaryMetricsReducer';
import { CoreReducer } from 'store/reducers/CoreReducer';
import { DatasetPreviewerReducer } from 'store/reducers/DatasetPreviewerReducer';
import { ExperimentPreviewerReducer } from 'store/reducers/ExperimentPreviewerReducer';
import { GlobalIndicatorReducer } from 'store/reducers/GlobalIndicatorReducer';
import { IntersectionReducer } from 'store/reducers/IntersectionReducer';
import { NMetricsReducer } from 'store/reducers/NMetricsReducer';
import { SelectableInputReducer } from 'store/reducers/SelectableInputReducer';

export const rootReducer = (
  state: ImmediateStore,
  action: SnowmanAction
): ImmediateStore => {
  const coreState: CoreStore = CoreReducer(state?.CoreStore, action);
  const benchmarkState: BenchmarkConfigurationStore = BenchmarkConfiguratorReducer(
    state?.BenchmarkConfigurationStore,
    coreState,
    action
  );

  return {
    CoreStore: coreState,
    BenchmarkConfigurationStore: benchmarkState,
    DatasetPreviewerStore: DatasetPreviewerReducer(
      state?.DatasetPreviewerStore,
      action
    ),
    ExperimentPreviewerStore: ExperimentPreviewerReducer(
      state?.ExperimentPreviewerStore,
      action
    ),
    BinaryMetricsStore: BinaryMetricsReducer(state?.BinaryMetricsStore, action),
    NMetricsStore: NMetricsReducer(state?.NMetricsStore, action),
    GlobalIndicatorStore: GlobalIndicatorReducer(
      state?.GlobalIndicatorStore,
      action
    ),
    SelectableInputStore: SelectableInputReducer(
      state?.SelectableInputStore,
      action
    ),
    IntersectionStore: IntersectionReducer(
      state?.IntersectionStore,
      benchmarkState,
      action
    ),
  };
};
