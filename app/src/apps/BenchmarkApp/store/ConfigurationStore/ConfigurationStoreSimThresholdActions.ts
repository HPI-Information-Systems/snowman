import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreGenericActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { AlgorithmFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export const updateSimThresholdSelection = ({
  aCacheKey,
  newSelection,
  allowMultiple = true,
  filter,
}: {
  aCacheKey: StoreCacheKey;
  newSelection: number[];
  allowMultiple?: boolean;
  filter: AlgorithmFilterModel;
}): SnowmanThunkAction<void, BenchmarkAppModel> => (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  getState: () => BenchmarkAppModel
): void => {
  dispatch(
    updateSelection({
      cache: getState().config.simThresholds,
      aCacheKey,
      filter,
      newSelection,
      setSelectionAction:
        ConfigurationStoreActionTypes.SET_SIM_THRESHOLD_SELECTION,
      allowMultiple,
    })
  );
};
