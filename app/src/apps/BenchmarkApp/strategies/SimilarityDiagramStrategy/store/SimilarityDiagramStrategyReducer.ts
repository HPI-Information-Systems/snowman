import { MetricsEnum } from 'api';
import { SimilarityDiagramStrategyModel } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: SimilarityDiagramStrategyModel = {
  isValidConfig: true,
  diagramTracks: [],
  coordinates: [],
  experiments: [],
  yAxis: MetricsEnum.Precision,
};

const SimilarityDiagramStrategyReducer = (
  state: SimilarityDiagramStrategyModel = initialState,
  action: SnowmanAction
): SimilarityDiagramStrategyModel => state;

export default SimilarityDiagramStrategyReducer;
