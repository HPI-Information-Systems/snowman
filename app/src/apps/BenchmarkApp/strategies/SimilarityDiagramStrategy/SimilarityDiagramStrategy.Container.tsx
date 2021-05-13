import SimilarityDiagramStrategyView from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/SimilarityDiagramStrategy.View';
import { connect } from 'react-redux';

const SimilarityDiagramStrategyContainer = connect()(
  SimilarityDiagramStrategyView
);

export default SimilarityDiagramStrategyContainer;
