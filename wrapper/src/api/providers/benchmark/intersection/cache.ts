import { DatasetId, ExperimentId } from '../../../server/types';
import { Cache } from '../../../tools/cache';
import { Intersection } from '.';
import { CachedSubclusting } from './cachedSubclustering';

export const IntersectionCache = new Cache(
  (...args: ConstructorParameters<typeof Intersection>) =>
    new Intersection(...args)
);

export const SubclusterCache = new Cache(
  (...args: ConstructorParameters<typeof CachedSubclusting>) =>
    new CachedSubclusting(...args)
);

export function invalidateCaches(id: ExperimentId | DatasetId): void {
  IntersectionCache.invalidate(id);
  SubclusterCache.invalidate(id);
}
