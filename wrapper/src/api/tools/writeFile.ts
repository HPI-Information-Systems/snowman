import { createWriteStream } from 'fs';
import type { Writable } from 'stream';

export function writeFile(path: string): Writable {
  return createWriteStream(path, {
    encoding: 'utf-8',
  });
}
