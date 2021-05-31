import {
  DatasetsApi,
  ExperimentsApi,
  FileResponseFormat,
  JSONFileResponse,
} from 'api';
import { TuplesLoader } from 'types/TuplesLoader';
import {
  ApiClass,
  fileRequest,
  FileRequestKeys,
  FileRequestParameters,
  FileResponsePromise,
} from 'utils/fileRequest';

//! Cache loaders to not trigger a rerender

export type CustomTuplesLoaderParams<
  Api extends ApiClass,
  RequestKey extends FileRequestKeys<Api>
> = Omit<
  Parameters<InstanceType<Api>[RequestKey]>[0],
  'startAt' | 'limit' | 'format'
>;

export const createTuplesLoader = <
  Api extends ApiClass,
  RequestKey extends FileRequestKeys<Api>
>(
  api: Api,
  requestKey: RequestKey,
  params: CustomTuplesLoaderParams<Api, RequestKey>
): TuplesLoader => <Format extends FileResponseFormat>(
  startAt: number,
  stop: number,
  format: Format
) =>
  fileRequest(api, requestKey, ({
    ...params,
    startAt,
    limit: stop - startAt,
    format: format,
  } as unknown) as FileRequestParameters<Api, RequestKey, Format>);

const datasetTuplesLoaders = new Map<number, TuplesLoader>();
export const datasetTuplesLoader = (datasetId: number): TuplesLoader => {
  let tuplesLoader = datasetTuplesLoaders.get(datasetId);
  if (!tuplesLoader) {
    tuplesLoader = createTuplesLoader(DatasetsApi, 'getDatasetFile', {
      datasetId,
    });
    datasetTuplesLoaders.set(datasetId, tuplesLoader);
  }
  return tuplesLoader;
};

const experimentTuplesLoaders = new Map<number, TuplesLoader>();
export const experimentTuplesLoader = (experimentId: number): TuplesLoader => {
  let tuplesLoader = experimentTuplesLoaders.get(experimentId);
  if (!tuplesLoader) {
    tuplesLoader = createTuplesLoader(ExperimentsApi, 'getExperimentFile', {
      experimentId,
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
    tuplesLoader = createTuplesLoader(ExperimentsApi, 'getExperimentFile', {
      experimentId,
      similarityThresholdFunction: simFuncId,
      similarityThreshold: Number.MIN_SAFE_INTEGER,
    });
    simFunctionTuplesLoaders.set(simFuncId, tuplesLoader);
  }
  return tuplesLoader;
};

export const dummyTuplesLoader: TuplesLoader = <
  Format extends FileResponseFormat
>(
  start: number,
  stop: number,
  format: Format
): FileResponsePromise<Format> =>
  format === FileResponseFormat.Csv
    ? (Promise.resolve(new Blob()) as FileResponsePromise<Format>)
    : (Promise.resolve({
        data: [],
        header: [],
      } as JSONFileResponse) as FileResponsePromise<Format>);
