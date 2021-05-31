import {
  DatasetsApi,
  ExperimentsApi,
  FileResponseFormat,
  JSONFileResponse,
} from 'api';
import { TuplesLoader } from 'types/TuplesLoader';
import { fileRequest } from 'utils/fileRequest';

//! Cache loaders to not trigger a rerender

const datasetTuplesLoaders = new Map<number, TuplesLoader>();
export const datasetTuplesLoader = (datasetId: number): TuplesLoader => {
  let tuplesLoader = datasetTuplesLoaders.get(datasetId);
  if (!tuplesLoader) {
    tuplesLoader = (startAt: number, stop: number) =>
      fileRequest(DatasetsApi, 'getDatasetFile', {
        datasetId: datasetId,
        startAt,
        limit: stop - startAt,
        format: FileResponseFormat.Json,
      });
    datasetTuplesLoaders.set(datasetId, tuplesLoader);
  }
  return tuplesLoader;
};

const experimentTuplesLoaders = new Map<number, TuplesLoader>();
export const experimentTuplesLoader = (experimentId: number): TuplesLoader => {
  let tuplesLoader = experimentTuplesLoaders.get(experimentId);
  if (!tuplesLoader) {
    tuplesLoader = (startAt, stop) =>
      fileRequest(ExperimentsApi, 'getExperimentFile', {
        experimentId: experimentId,
        startAt,
        limit: stop - startAt,
        format: FileResponseFormat.Json,
      });
    experimentTuplesLoaders.set(experimentId, tuplesLoader);
  }
  return tuplesLoader;
};

const simFunctionTuplesLoaders = new Map<number, TuplesLoader>();
export const simFunctionTuplesLoader = (
  experimentId: number,
  simFuncId: number
): TuplesLoader => {
  let tuplesLoader = simFunctionTuplesLoaders.get(simFuncId);
  if (!tuplesLoader) {
    tuplesLoader = (startAt, stop) =>
      fileRequest(ExperimentsApi, 'getExperimentFile', {
        experimentId,
        startAt,
        limit: stop - startAt,
        similarityThresholdFunction: simFuncId,
        similarityThreshold: Number.MIN_SAFE_INTEGER,
        format: FileResponseFormat.Json,
      });
    simFunctionTuplesLoaders.set(simFuncId, tuplesLoader);
  }
  return tuplesLoader;
};

export const dummyTuplesLoader = (): Promise<JSONFileResponse> =>
  Promise.resolve({ data: [], header: [] });
