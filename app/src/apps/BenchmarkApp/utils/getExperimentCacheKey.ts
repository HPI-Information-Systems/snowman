import {
  CacheBaseKeyEnum,
  GetCacheKey,
} from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

const getExperimentCacheKey: GetCacheKey = (id = 0): StoreCacheKey =>
  `${CacheBaseKeyEnum.experiment}-+-${id}`;

export default getExperimentCacheKey;
