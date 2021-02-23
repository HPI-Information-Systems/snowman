import path from 'path';
import { createLogger, format, transports } from 'winston';

import { STORAGE_DIR } from '../config';

export const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
    new transports.File({
      filename: path.join(STORAGE_DIR, 'error.log'),
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.metadata(),
        format.json()
      ),
    }),
    new transports.File({
      format: format.combine(
        format.timestamp(),
        format.metadata(),
        format.json()
      ),
      filename: path.join(STORAGE_DIR, 'combined.log'),
    }),
  ],
});
