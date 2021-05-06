import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreGenericActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { ExperimentFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import {
  ConfigurationFilters,
  StoreCacheKey,
} from 'apps/BenchmarkApp/types/StoreCacheKey';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export const updateExperimentSelection = ({
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
      cache: getState().config.experiments,
      aCacheKey,
      filter: (ConfigurationFilters[aCacheKey] ?? {}) as ExperimentFilterModel,
      newSelection,
      setSelectionAction:
        ConfigurationStoreActionTypes.SET_EXPERIMENT_SELECTION,
      allowMultiple,
    })
  );
};
