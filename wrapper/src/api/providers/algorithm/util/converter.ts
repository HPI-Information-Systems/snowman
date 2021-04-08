import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import { Algorithm } from '../../../server/types';
type StoredAlgorithm = ColumnValues<
  typeof tableSchemas['meta']['algorithm']['columns']
>;

export class AlgorithmConverter {
  apiToStored(api: Algorithm): StoredAlgorithm {
    return {
      id: api.id,
      name: api.name,
      description: api.description ?? null,
    };
  }
  storedToApi(stored: StoredAlgorithm): Algorithm {
    return {
      id: stored.id,
      name: stored.name,
      description: stored.description ?? undefined,
    };
  }
}
