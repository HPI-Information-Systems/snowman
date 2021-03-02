import { datasetSchemas } from './dataset';
import { experimentSchemas } from './experiment';
import { metaSchemas } from './meta';
import { SchemaV0 } from './migration';

export { datasetCustomColumnPrefix, datasetSchemas } from './dataset';
export { experimentCustomColumnPrefix, experimentSchemas } from './experiment';
export { metaSchemas } from './meta';

export const tableSchemas = {
  ...metaSchemas,
  ...datasetSchemas,
  ...experimentSchemas,
};
export const schemas = ['meta', 'dataset', 'experiment'] as const;
export const version = new SchemaV0();
