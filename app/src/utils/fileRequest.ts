/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Configuration,
  FileResponseFormat,
  JSONFileResponse,
  JSONFileResponseFromJSON,
} from 'api';

type ApiClass = new (configuration?: Configuration) => any;

type FileRequest = (
  params: {
    format?: FileResponseFormat;
  } & any
) => Promise<Blob>;

type FileRequestKeys<Api extends ApiClass> = {
  [key in keyof InstanceType<Api>]: InstanceType<Api>[key] extends FileRequest
    ? key
    : never;
}[keyof InstanceType<Api>];

type FileRequestParameters<
  Api extends ApiClass,
  RequestKey extends FileRequestKeys<Api>,
  Format extends FileResponseFormat
> = Parameters<InstanceType<Api>[RequestKey]> & [{ format: Format }];

type FileResponse<Format> = Format extends FileResponseFormat.Csv
  ? Promise<Blob>
  : Promise<JSONFileResponse>;

export const fileRequest = <
  Api extends ApiClass,
  RequestKey extends FileRequestKeys<Api>,
  Format extends FileResponseFormat
>(
  api: Api,
  requestKey: RequestKey,
  ...params: FileRequestParameters<Api, RequestKey, Format>
): FileResponse<Format> =>
  new api()
    [requestKey](...params)
    .then((blob: Blob) =>
      params[0].format === FileResponseFormat.Csv
        ? blob
        : blob.text().then((text) => JSONFileResponseFromJSON(JSON.parse(text)))
    ) as FileResponse<Format>;
