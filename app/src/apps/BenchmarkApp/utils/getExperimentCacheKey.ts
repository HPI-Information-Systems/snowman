import { CacheBaseKeyEnum } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

const getExperimentCacheKey = (id = 0): StoreCacheKey =>
  `${CacheBaseKeyEnum.experiment}-+-${id}`;

export default getExperimentCacheKey;
