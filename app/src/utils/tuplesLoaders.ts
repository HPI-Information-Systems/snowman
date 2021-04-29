import { DatasetsApi, ExperimentsApi, FileResponse } from 'api';
import { TuplesLoader } from 'types/TuplesLoader';

// Cache loaders to not trigger a rerender// Cache loaders to not trigger a rerender
const datasetTuplesLoaders = new Map<number, TuplesLoader>();
export const datasetTuplesLoader = (datasetId: number): TuplesLoader => {
  let tuplesLoader = datasetTuplesLoaders.get(datasetId);
  if (!tuplesLoader) {
    tuplesLoader = (startAt: number, stop: number) =>
      new DatasetsApi().getDatasetFile({
        datasetId: datasetId,
        startAt,
        limit: stop - startAt,
      });
    datasetTuplesLoaders.set(datasetId, tuplesLoader);
  }
  return tuplesLoader;
};

// Cache loaders to not trigger a rerender
const experimentTuplesLoaders = new Map<number, TuplesLoader>();
export const experimentTuplesLoader = (experimentId: number): TuplesLoader => {
  let tuplesLoader = experimentTuplesLoaders.get(experimentId);
  if (!tuplesLoader) {
    tuplesLoader = (startAt, stop) =>
      new ExperimentsApi().getExperimentFile({
        experimentId: experimentId,
        startAt,
        limit: stop - startAt,
      });
    experimentTuplesLoaders.set(experimentId, tuplesLoader);
  }
  return tuplesLoader;
};

export const dummyTuplesLoader = (): Promise<FileResponse> =>
  Promise.resolve({ data: [], header: [] });
