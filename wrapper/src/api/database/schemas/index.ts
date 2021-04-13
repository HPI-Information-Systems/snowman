import { cacheSchemas } from './cache';
import { datasetSchemas } from './dataset';
import { experimentSchemas } from './experiment';
import { metaSchemas } from './meta';

export { datasetCustomColumnPrefix, datasetSchemas } from './dataset';
export { experimentCustomColumnPrefix, experimentSchemas } from './experiment';
export { metaSchemas } from './meta';

export const tableSchemas = {
  ...metaSchemas,
  ...datasetSchemas,
  ...experimentSchemas,
  ...cacheSchemas,
};
export const schemas = ['meta', 'dataset', 'experiment', 'cache'] as const;
