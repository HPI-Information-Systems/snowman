import {
  CacheBaseKeyEnum,
  GetCacheKey,
} from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

const getDatasetCacheKey: GetCacheKey = (id = 0): StoreCacheKey =>
  `${CacheBaseKeyEnum.dataset}-+-${id}`;

export default getDatasetCacheKey;
