import { FileResponse } from 'api';

export interface TuplesLoader {
  (startIndex: number, stopIndex: number): Promise<FileResponse>;
}
