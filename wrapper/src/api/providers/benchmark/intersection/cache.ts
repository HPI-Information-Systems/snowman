import { tables } from '../../../database';
import {
  DatasetId,
  ExperimentId,
  SimilarityThresholdFunctionId,
} from '../../../server/types';
import { PartiallySortedCache } from '../../../tools/cache/partiallySorted';
import { Intersection } from '.';
import { entangledIntersectionBaseParams } from './base';
import { CachedSubclusting } from './cachedSubclustering';

export const IntersectionCache = new PartiallySortedCache(
  (...args: ConstructorParameters<typeof Intersection>) =>
    new Intersection(...args),
  entangledIntersectionBaseParams
);

export const SubclusterCache = new PartiallySortedCache(
  (...args: ConstructorParameters<typeof CachedSubclusting>) =>
    new CachedSubclusting(...args),
  CachedSubclusting.entangledConstructorParameters
);

export function invalidateCaches(
  id: ExperimentId | DatasetId | SimilarityThresholdFunctionId
): void {
  IntersectionCache.invalidate(id);
  SubclusterCache.invalidate(id);
  tables.cache.intersectionCounts.delete(
    {
      key: `%${id}%`,
    },
    'LIKE'
  );
}
