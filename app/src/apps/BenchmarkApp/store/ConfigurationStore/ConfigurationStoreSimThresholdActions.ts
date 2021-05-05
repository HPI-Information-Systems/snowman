import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreGenericActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  ConfigurationFilters,
  StoreCacheKey,
} from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { SimThresholdFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export const updateSimThresholdSelection = ({
  aCacheKey,
  newSelection,
  allowMultiple = true,
}: {
  aCacheKey: StoreCacheKey;
  newSelection: number[];
  allowMultiple?: boolean;
}): SnowmanThunkAction<void, BenchmarkAppModel> => (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  getState: () => BenchmarkAppModel
): void => {
  dispatch(
    updateSelection({
      cache: getState().config.simThresholds,
      aCacheKey,
      filter: (ConfigurationFilters[aCacheKey] ??
        undefined) as SimThresholdFilterModel,
      newSelection,
      setSelectionAction:
        ConfigurationStoreActionTypes.SET_SIM_THRESHOLD_SELECTION,
      allowMultiple,
    })
  );
};
