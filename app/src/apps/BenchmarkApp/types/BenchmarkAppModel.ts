import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export interface BenchmarkAppModel {
  resources: CentralResourcesModel;
  activeStrategy: StrategyIDs;
  config: ConfigurationStoreModel;
}

export type BenchmarkAppThunkAction<R> = SnowmanThunkAction<
  R,
  BenchmarkAppModel
>;

export type BenchmarkAppDispatch = SnowmanDispatch<BenchmarkAppModel>;
