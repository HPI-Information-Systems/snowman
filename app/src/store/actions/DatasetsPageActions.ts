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
import { TuplesLoader } from 'types/TuplesLoader';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

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
        .then()
  );

export const deleteDataset = (
  aDataset: Dataset
): SnowmanThunkAction<Promise<void>> => async (
  dispatch: SnowmanDispatch
): Promise<void> =>
  RequestHandler(
    (): Promise<void> =>
      new DatasetsApi().deleteDataset({ datasetId: aDataset.id }),
    SUCCESS_TO_DELETE_DATASET
  ).then((): Promise<void> => dispatch(getDatasets()));

// Cache loaders to not trigger a rerender
const datasetTuplesLoaders = new Map<number, TuplesLoader>();
export const datasetTuplesLoader = (datasetId: number): TuplesLoader => {
  let tuplesLoader = datasetTuplesLoaders.get(datasetId);
  if (!tuplesLoader) {
    tuplesLoader = (startAt, stop) =>
      new DatasetsApi().getDatasetFile({
        datasetId: datasetId,
        startAt,
        limit: stop - startAt,
      });
    datasetTuplesLoaders.set(datasetId, tuplesLoader);
  }
  return tuplesLoader;
};
