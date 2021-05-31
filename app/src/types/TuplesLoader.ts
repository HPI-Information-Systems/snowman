import { FileResponseFormat } from 'api';
import { FileResponsePromise } from 'utils/fileRequest';

export interface TuplesLoader {
  <Format extends FileResponseFormat>(
    startIndex: number,
    stopIndex: number,
    format: Format
  ): FileResponsePromise<Format>;
}
