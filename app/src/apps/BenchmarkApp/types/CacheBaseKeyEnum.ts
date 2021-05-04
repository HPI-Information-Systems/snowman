export enum CacheBaseKeyEnum {
  groundTruth = 'CacheKeyEnum-groundTruth',
  experiment = 'CacheKeyEnum-experiment',
  dataset = 'CacheKeyEnum-dataset',
}

export type GetCacheKey = (index?: number) => string;

export const GetMultiSelectCacheKey = -1;
