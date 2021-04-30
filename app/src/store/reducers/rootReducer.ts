import { SnowmanAction } from 'store/messages';
import { BenchmarkConfigurationStore, ImmediateStore } from 'store/models';
import { BenchmarkConfiguratorReducer } from 'store/reducers/BenchmarkConfiguratorReducer';

export const rootReducer = (
  state: ImmediateStore,
  action: SnowmanAction
): ImmediateStore => {
  const benchmarkState: BenchmarkConfigurationStore = BenchmarkConfiguratorReducer(
    state?.BenchmarkConfigurationStore
  );

  return {
    BenchmarkConfigurationStore: benchmarkState,
  };
};
