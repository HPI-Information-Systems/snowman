import { ExperimentId } from '../../../../server/types';
import { Cache } from '../../../../tools/cache';
import { Intersection } from '.';
import { CachedSubclusting } from './CachedSubcluster';

export const IntersectionCache = new Cache(
  (...args: ConstructorParameters<typeof Intersection>) =>
    new Intersection(...args)
);

export const SubclusterCache = new Cache(
  (...args: ConstructorParameters<typeof CachedSubclusting>) =>
    new CachedSubclusting(...args)
);

export function invalidateCaches(experiment: ExperimentId): void {
  IntersectionCache.invalidate(experiment);
  SubclusterCache.invalidate(experiment);
}
