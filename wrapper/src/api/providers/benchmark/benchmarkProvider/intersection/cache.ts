import { Cache } from '../../../../tools/cache';
import { Intersection } from '.';

export const IntersectionCache = new Cache(
  (...args: ConstructorParameters<typeof Intersection>) =>
    new Intersection(...args)
);
