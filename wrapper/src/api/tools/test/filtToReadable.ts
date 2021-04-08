import { Readable } from 'stream';

export function fileToReadable(file: string[][]): Readable {
  return Readable.from(file.map((row) => row.join(',')).join('\n'));
}
