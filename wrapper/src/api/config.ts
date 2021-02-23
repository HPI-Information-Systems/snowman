import path from 'path';

import { cliArgs } from './tools/cli';

export const ASSETS_DIR = path.join(__dirname, '../../assets');
export const OPENAPI_YAML_PATH = path.join(
  ASSETS_DIR,
  'api_specification.yaml'
);
export const DATABASE_SETUP_DIR = path.join(ASSETS_DIR, 'database_setup');

export const STORAGE_DIR =
  cliArgs.path ?? path.join(__dirname, '../../storage');

export const PORT = 8123;
export const HOST = '127.0.0.1';

export const INSERT_BATCH_SIZE = 500;
