import { SnowmanAction } from 'store/messages';
import { BenchmarkConfigurationStore, ImmediateStore } from 'store/models';
import { BenchmarkConfiguratorReducer } from 'store/reducers/BenchmarkConfiguratorReducer';
import { BinaryMetricsReducer } from 'store/reducers/BinaryMetricsReducer';

export const rootReducer = (
  state: ImmediateStore,
  action: SnowmanAction
): ImmediateStore => {
  const benchmarkState: BenchmarkConfigurationStore = BenchmarkConfiguratorReducer(
    state?.BenchmarkConfigurationStore
  );

  return {
    BenchmarkConfigurationStore: benchmarkState,
    BinaryMetricsStore: BinaryMetricsReducer(state?.BinaryMetricsStore, action),
  };
};
