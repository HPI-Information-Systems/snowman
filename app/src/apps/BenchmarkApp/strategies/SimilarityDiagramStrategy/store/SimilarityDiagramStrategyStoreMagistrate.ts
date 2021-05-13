import SimilarityDiagramStrategyReducer from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/store/SimilarityDiagramStrategyReducer';
import { SimilarityDiagramStrategyModel } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const SimilarityDiagramStrategyStoreMagistrate = new StoreMagistrate<SimilarityDiagramStrategyModel>(
  'SimilarityDiagramStrategyStore',
  SimilarityDiagramStrategyReducer
);
