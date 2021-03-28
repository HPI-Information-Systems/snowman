import IntersectionDroppableView from 'components/IntersectionDroppable/IntersectionDroppable.View';
import { IntersectionDroppableStateProps } from 'components/IntersectionDroppable/IntersectionDroppableProps';
import { connect } from 'react-redux';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): IntersectionDroppableStateProps => {
  return {
    pairCounts: new Map(
      state.IntersectionStore.counts
        .filter(({ experiments }) => experiments.length === 1)
        .filter(
          ({ experiments: [{ predictedCondition }] }) => predictedCondition
        )
        .map(({ experiments: [{ experimentId }], numberPairs }) => [
          experimentId,
          numberPairs,
        ])
    ),
  };
};

const IntersectionDroppable = connect(mapStateToProps)(
  IntersectionDroppableView
);

export default IntersectionDroppable;
