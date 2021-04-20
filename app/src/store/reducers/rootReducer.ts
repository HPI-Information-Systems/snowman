import { SnowmanAction } from 'store/messages';
import {
  BenchmarkConfigurationStore,
  CoreStore,
  ImmediateStore,
  Store,
} from 'store/models';
import { BenchmarkConfiguratorReducer } from 'store/reducers/BenchmarkConfiguratorReducer';
import { BinaryMetricsReducer } from 'store/reducers/BinaryMetricsReducer';
import { CoreReducer } from 'store/reducers/CoreReducer';
import { DatasetDialogReducer } from 'store/reducers/DatasetDialogReducer';
import { DatasetPreviewerReducer } from 'store/reducers/DatasetPreviewerReducer';
import { ExperimentDialogReducer } from 'store/reducers/ExperimentDialogReducer';
import { ExperimentPreviewerReducer } from 'store/reducers/ExperimentPreviewerReducer';
import { GlobalIndicatorReducer } from 'store/reducers/GlobalIndicatorReducer';
import { IntersectionReducer } from 'store/reducers/IntersectionReducer';
import { NMetricsReducer } from 'store/reducers/NMetricsReducer';
import { RenderLogicReducer } from 'store/reducers/RenderLogicReducer';
import { SelectableInputReducer } from 'store/reducers/SelectableInputReducer';

export const rootReducer = (state: Store, action: SnowmanAction): Store => {
  const coreState: CoreStore = CoreReducer(state?.CoreStore, action);
  const benchmarkState: BenchmarkConfigurationStore = BenchmarkConfiguratorReducer(
    state?.BenchmarkConfigurationStore,
    coreState,
    action
  );

  const immediateState: ImmediateStore = {
    CoreStore: coreState,
    BenchmarkConfigurationStore: benchmarkState,
    DatasetDialogStore: DatasetDialogReducer(state?.DatasetDialogStore, action),
    ExperimentDialogStore: ExperimentDialogReducer(
      state?.ExperimentDialogStore,
      action
    ),
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
  return {
    ...immediateState,
    RenderLogicStore: RenderLogicReducer(state?.RenderLogicStore, action),
    SnowmanGlobalStore: {
      RenderLogicStore: RenderLogicReducer(state?.RenderLogicStore, action),
      LoadingIndicatorStore: GlobalIndicatorReducer(
        state?.GlobalIndicatorStore,
        action
      ),
    },
  };
};
