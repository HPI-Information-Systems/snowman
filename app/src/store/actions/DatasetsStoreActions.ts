import { Dataset, DatasetsApi } from 'api';
import { DatasetStoreActionTypes } from 'store/actions/actionTypes';
import { resetSelectedExperiments } from 'store/actions/ExperimentsStoreActions';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import { store } from 'store/store';
import { MagicNotPossibleId } from 'utils/constants';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const clickOnDataset = (
  aDatasetId: number
): SnowmanThunkAction<void> => (dispatch: SnowmanDispatch): void => {
  const previousSelectedDataset = store.getState().DatasetsStore
    .selectedDataset;
  const clickedDataset: Dataset | null =
    store
      .getState()
      .DatasetsStore.datasets.find(
        (aDataset: Dataset): boolean => aDataset.id === aDatasetId
      ) ?? null;
  if (clickedDataset !== null)
    dispatch({
      type: DatasetStoreActionTypes.CLICK_ON_DATASET,
      payload: clickedDataset,
    });
  else dispatch(resetSelectedDataset());
  if (
    (clickedDataset?.id ?? MagicNotPossibleId) !==
    (previousSelectedDataset?.id ?? MagicNotPossibleId)
  )
    dispatch(resetSelectedExperiments());
};

export const clickOnDatasetTag = (aTag: string): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DatasetStoreActionTypes.CLICK_ON_DATASET_TAG,
    payload: aTag,
  });

export const resetSelectedDataset = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DatasetStoreActionTypes.RESET_SELECTED_DATASET,
    // reducer ignores payload
    payload: false,
  });

export const getDatasets = (): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new DatasetsApi()
        .getDatasets()
        .then(
          (allDatasets: Dataset[]): SnowmanAction =>
            dispatch({
              type: DatasetStoreActionTypes.SET_ALL_DATASETS,
              payload: allDatasets,
            })
        )
        .then(),
    dispatch
  );

export const deleteDataset = (
  id: number
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> => {
  dispatch(resetSelectedDataset());
  return RequestHandler(
    (): Promise<void> => new DatasetsApi().deleteDataset({ datasetId: id }),
    dispatch
  ).then((): Promise<void> => dispatch(getDatasets()));
};
