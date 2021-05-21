import { datasetSchemas } from './dataset';
import { experimentSchemas } from './experiment';
import { metaSchemas } from './meta';

export { datasetCustomColumnPrefix, datasetSchemas } from './dataset';
export {
  experimentSchemas,
  isSimilarityColumn,
  removeExperimentCustomColumnPrefix,
  similarityCustomColumnPrefix,
} from './experiment';
export { metaSchemas } from './meta';

export const tableSchemas = {
  ...metaSchemas,
  ...datasetSchemas,
  ...experimentSchemas,
};
export const schemas = ['meta', 'dataset', 'experiment'] as const;
