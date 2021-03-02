import path from 'path';

export const ASSETS_DIR = path.join(__dirname, '../../assets');
export const OPENAPI_YAML_PATH = path.join(
  ASSETS_DIR,
  'api_specification.yaml'
);
export const DATABASE_SETUP_DIR = path.join(ASSETS_DIR, 'database_setup');

export const INSERT_BATCH_SIZE = 500;
