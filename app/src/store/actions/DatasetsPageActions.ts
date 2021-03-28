import { Dataset, DatasetsApi } from 'api';
import {
  CoreStoreActionTypes,
  DatasetsPageActionTypes,
} from 'store/actions/actionTypes';
import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';
import { SUCCESS_TO_DELETE_DATASET } from 'structs/statusMessages';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

import { TuplesLoader } from '../../components/DataViewer/TuplesLoader';

export const clickOnDataset = (aDataset: Dataset): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DatasetsPageActionTypes.CLICK_ON_DATASET,
    payload: aDataset,
  });

export const clickOnDatasetCategory = (
  aCategory: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DatasetsPageActionTypes.CLICK_ON_DATASET_CATEGORY,
    payload: aCategory,
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
              type: CoreStoreActionTypes.SET_ALL_DATASETS,
              payload: allDatasets,
            })
        )
        .then(),
    dispatch
  );

export const deleteDataset = (
  aDataset: Dataset
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new DatasetsApi().deleteDataset({ datasetId: aDataset.id }),
    dispatch,
    SUCCESS_TO_DELETE_DATASET
  ).then((): Promise<void> => dispatch(getDatasets()));

const datasetTuplesLoaders = new Map<number, TuplesLoader>();
export const datasetTuplesLoader = (dataset: number): TuplesLoader => {
  let tuplesLoader = datasetTuplesLoaders.get(dataset);
  if (!tuplesLoader) {
    tuplesLoader = (startAt, stop) =>
      new DatasetsApi().getDatasetFile({
        datasetId: dataset,
        startAt,
        limit: stop - startAt,
      });
    datasetTuplesLoaders.set(dataset, tuplesLoader);
  }
  return tuplesLoader;
};
