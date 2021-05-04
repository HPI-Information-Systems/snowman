import {
  CacheBaseKeyEnum,
  GetCacheKey,
} from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

const getGroundTruthCacheKey: GetCacheKey = (id = 0): StoreCacheKey =>
  `${CacheBaseKeyEnum.groundTruth}-+-${id}`;

export default getGroundTruthCacheKey;
