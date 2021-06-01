import { Readable } from 'stream';

import { FileResponseFormat, JSONFileResponse } from '../../server/types';
import { convertFileResponse } from '../convertFileResponse';

export type FileResponse<
  Format extends FileResponseFormat = FileResponseFormat
> = Format extends FileResponseFormat.Csv ? string : JSONFileResponse;

async function readAll(readable: Readable): Promise<string> {
  const chunks: string[] = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  return chunks.join('');
}

describe.each([
  {
    [FileResponseFormat.Json]: {
      header: [],
      data: [],
    },
    [FileResponseFormat.Csv]: '\n',
  },
  {
    [FileResponseFormat.Json]: {
      header: [',', ''],
      data: [
        ['', ''],
        ["'", ''],
        ['"', ''],
      ],
    },
    [FileResponseFormat.Csv]: `",",\n,\n',\n"'"",\n`,
  },
  {
    [FileResponseFormat.Json]: {
      header: ['1', '2', '3'],
      data: [
        ['3', '2', '1'],
        ['1', '3', '2'],
      ],
    },
    [FileResponseFormat.Csv]: '1,2,3\n3,2,1\n1,3,2\n',
  },
] as { [format in FileResponseFormat]: FileResponse<format> }[])(
  'convertFileResponse',
  (responses) => {
    describe.each(Object.values(FileResponseFormat) as FileResponseFormat[])(
      'converts correctly to',
      (format) => {
        test(format, async () => {
          const response = convertFileResponse(
            responses[FileResponseFormat.Json],
            format
          );
          expect(
            'read' in response ? await readAll(response) : response
          ).toEqual(responses[format]);
        });
      }
    );
  }
);
