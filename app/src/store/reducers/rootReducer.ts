import { SnowmanAction } from 'store/messages';
import {
  BenchmarkConfigurationStore,
  CoreStore,
  ImmediateStore,
} from 'store/models';
import { BenchmarkConfiguratorReducer } from 'store/reducers/BenchmarkConfiguratorReducer';
import { BinaryMetricsReducer } from 'store/reducers/BinaryMetricsReducer';
import { CoreReducer } from 'store/reducers/CoreReducer';

export const rootReducer = (
  state: ImmediateStore,
  action: SnowmanAction
): ImmediateStore => {
  const coreState: CoreStore = CoreReducer(state?.CoreStore, action);
  const benchmarkState: BenchmarkConfigurationStore = BenchmarkConfiguratorReducer(
    state?.BenchmarkConfigurationStore
  );

  return {
    CoreStore: coreState,
    BenchmarkConfigurationStore: benchmarkState,
    BinaryMetricsStore: BinaryMetricsReducer(state?.BinaryMetricsStore, action),
  };
};
