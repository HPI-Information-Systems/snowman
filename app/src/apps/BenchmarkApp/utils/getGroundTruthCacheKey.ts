import { CacheBaseKeyEnum } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

const getGroundTruthCacheKey = (id = 0): StoreCacheKey =>
  `${CacheBaseKeyEnum.groundTruth}-+-${id}`;

export default getGroundTruthCacheKey;
