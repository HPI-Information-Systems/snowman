import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreGenericActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { SimThresholdFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import {
  ConfigurationFilters,
  StoreCacheKey,
} from 'apps/BenchmarkApp/types/StoreCacheKey';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export const updateSimThresholdValue = ({
  aCacheKey,
  newValue,
}: {
  aCacheKey: StoreCacheKey;
  newValue: number | undefined;
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
      newSelection: [newValue],
      setSelectionAction:
        ConfigurationStoreActionTypes.SET_SIM_THRESHOLD_SELECTION,
      allowMultiple: false,
    })
  );
};
