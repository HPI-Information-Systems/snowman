import KpiInvestigatorStrategyReducer from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/store/KpiInvestigatorStrategyReducer';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const KpiInvestigatorStrategyStoreMagistrate = new StoreMagistrate<KpiInvestigatorStrategyModel>(
  'KpiInvestigatorStrategyStore',
  KpiInvestigatorStrategyReducer
);
