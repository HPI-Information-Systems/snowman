import { datasetSchemas } from './dataset';
import { experimentSchemas } from './experiment';
import { metaSchemas } from './meta';

export const tableSchemas = {
  ...metaSchemas,
  ...datasetSchemas,
  ...experimentSchemas,
};

export const schemas = ['meta', 'dataset', 'experiment'] as const;
