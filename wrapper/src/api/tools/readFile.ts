import { createReadStream } from 'fs';
import type { Readable } from 'stream';

export function readFile(path: string): Readable {
  return createReadStream(path, {
    encoding: 'utf-8',
  });
}
