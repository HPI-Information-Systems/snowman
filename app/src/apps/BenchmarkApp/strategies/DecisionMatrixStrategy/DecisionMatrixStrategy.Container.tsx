import { Algorithm } from 'api';
import DecisionMatrixStrategyView from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategy.View';
import {
  DecisionMatrixStrategyDispatchProps,
  DecisionMatrixStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategyProps';
import { toggleExpansion } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/store/DecisionMatrixStrategyActions';
import { DecisionMatrixStrategyModel } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/DecisionMatrixStrategyModel';
import { ExpansionTypes } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/ExpansionTypes';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: DecisionMatrixStrategyModel
): DecisionMatrixStrategyStateProps => ({
  isValidConfig: state.isValidConfig,
  selectedAlgorithms: state.enhancedAlgorithms.map(
    (anEAlgo): Algorithm => anEAlgo.algorithm
  ),
  averageMetrics: state.averageMetrics,
  expandedEntities: state.expandedEntities,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<DecisionMatrixStrategyModel>
): DecisionMatrixStrategyDispatchProps => ({
  toggleExpansion: (aType: ExpansionTypes) => {
    dispatch(toggleExpansion(aType));
  },
});

const DecisionMatrixStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionMatrixStrategyView);

export default DecisionMatrixStrategyContainer;
