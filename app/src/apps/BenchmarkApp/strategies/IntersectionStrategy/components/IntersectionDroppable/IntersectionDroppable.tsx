import IntersectionDroppableView from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionDroppable/IntersectionDroppable.View';
import { IntersectionDroppableStateProps } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionDroppable/IntersectionDroppableProps';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: IntersectionStrategyModel
): IntersectionDroppableStateProps => ({
  pairCounts: state.counts
    .filter(({ experiments }) => experiments.length === 1)
    .filter(({ experiments: [{ predictedCondition }] }) => predictedCondition)
    .map(({ experiments: [config], numberPairs }) => [config, numberPairs]),
});

const IntersectionDroppable = connect(mapStateToProps)(
  IntersectionDroppableView
);

export default IntersectionDroppable;
