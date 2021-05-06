import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreGenericActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  ConfigurationFilters,
  StoreCacheKey,
} from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { ExperimentFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { getDefinedItems } from 'apps/BenchmarkApp/utils/configurationItemGetter';
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

export const primeExperimentSelection = (
  aCacheKey: StoreCacheKey,
  experimentId: number
): SnowmanThunkAction<void, BenchmarkAppModel> => (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  getState: () => BenchmarkAppModel
): void => {
  const newSelection = [
    ...getDefinedItems(aCacheKey, getState().config.experiments),
  ];
  const sourceIndex = newSelection.indexOf(experimentId);
  if (sourceIndex > 0) {
    const tmp = newSelection[0];
    newSelection[0] = newSelection[sourceIndex];
    newSelection[sourceIndex] = tmp;
    dispatch(updateExperimentSelection({ aCacheKey, newSelection }));
  }
};

export const doPrimeExperimentSelection = (
  aCacheKey: StoreCacheKey,
  experimentId: number
): void => {
  (BenchmarkAppStoreMagistrate.getStore()
    .dispatch as SnowmanDispatch<BenchmarkAppModel>)(
    primeExperimentSelection(aCacheKey, experimentId)
  );
};
