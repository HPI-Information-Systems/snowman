/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Configuration,
  FileResponseFormat,
  JSONFileResponse,
  JSONFileResponseFromJSON,
} from 'api';

export type ApiClass = new (configuration?: Configuration) => any;

type FileRequest = (
  params: {
    format?: FileResponseFormat;
  } & any
) => Promise<Blob>;

export type FileRequestKeys<Api extends ApiClass> = {
  [key in keyof InstanceType<Api>]: InstanceType<Api>[key] extends FileRequest
    ? key
    : never;
}[keyof InstanceType<Api>];

export type FileRequestParameters<
  Api extends ApiClass,
  RequestKey extends FileRequestKeys<Api>,
  Format extends FileResponseFormat
> = Parameters<InstanceType<Api>[RequestKey]>[0] & { format: Format };

export type FileResponsePromise<Format> = Promise<FileResponse<Format>>;

export type FileResponse<Format> = Format extends FileResponseFormat.Csv
  ? Blob
  : JSONFileResponse;

export const fileRequest = <
  Api extends ApiClass,
  RequestKey extends FileRequestKeys<Api>,
  Format extends FileResponseFormat
>(
  api: Api,
  requestKey: RequestKey,
  params: FileRequestParameters<Api, RequestKey, Format>
): FileResponsePromise<Format> =>
  new api()
    [requestKey](params)
    .then((blob: Blob) =>
      params.format === FileResponseFormat.Csv
        ? blob
        : blob.text().then((text) => JSONFileResponseFromJSON(JSON.parse(text)))
    ) as FileResponsePromise<Format>;
