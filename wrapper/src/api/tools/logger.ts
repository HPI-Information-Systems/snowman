import path from 'path';
import { createLogger, format, transports } from 'winston';

import { cliArgs } from './cli';

export const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
    new transports.File({
      filename: path.join(cliArgs.storageDirectory, 'error.log'),
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
      filename: path.join(cliArgs.storageDirectory, 'combined.log'),
    }),
  ],
});
