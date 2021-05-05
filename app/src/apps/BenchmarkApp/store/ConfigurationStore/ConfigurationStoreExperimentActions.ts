import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreGenericActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { ExperimentFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export const updateExperimentSelection = ({
  aCacheKey,
  newSelection,
  allowMultiple = true,
  filter,
}: {
  aCacheKey: StoreCacheKey;
  newSelection: number[];
  allowMultiple?: boolean;
  filter: ExperimentFilterModel;
}): SnowmanThunkAction<void, BenchmarkAppModel> => (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  getState: () => BenchmarkAppModel
): void => {
  dispatch(
    updateSelection({
      cache: getState().config.experiments,
      aCacheKey,
      filter,
      newSelection,
      setSelectionAction:
        ConfigurationStoreActionTypes.SET_EXPERIMENT_SELECTION,
      allowMultiple,
    })
  );
};
