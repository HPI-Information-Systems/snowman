import { FileResponseFormat } from '../../server/types';
import { convertFileResponse, FileResponse } from '../convertFileResponse';

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
        test(format, () => {
          expect(
            convertFileResponse(responses[FileResponseFormat.Json], format)
          ).toEqual(responses[format]);
        });
      }
    );
  }
);
