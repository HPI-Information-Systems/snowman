import { CacheBaseKeyEnum } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

const getDatasetCacheKey = (id = 0): StoreCacheKey =>
  `${CacheBaseKeyEnum.dataset}-+-${id}`;

export default getDatasetCacheKey;
