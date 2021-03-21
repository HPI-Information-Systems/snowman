import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import { Algorithm } from '../../../server/types';

type StoredAlgorithm = ColumnValues<
  typeof tableSchemas['meta']['algorithm']['columns']
>;

export class AlgorithmConverter {
  apiToStored(api: Algorithm): StoredAlgorithm {
    return {
      ...api,
      description: api.description ?? null,
    };
  }
  storedToApi(stored: StoredAlgorithm): Algorithm {
    return {
      ...stored,
      description: stored.description ?? undefined,
    };
  }
}
