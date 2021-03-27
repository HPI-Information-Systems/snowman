import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

import { resetIntersection } from '../../store/actions/IntersectionStoreActions';
import IntersectionVennDiagramView from './IntersectionVennDiagram.View';
import {
  IntersectionVennDiagramDispatchProps,
  IntersectionVennDiagramStateProps,
} from './IntersectionVennDiagramProps';

const mapStateToProps = (state: Store): IntersectionVennDiagramStateProps => {
  const { excluded, included, counts } = state.IntersectionStore;
  const notIgnored = new Set([...excluded, ...included].map(({ id }) => id));
  const availableExperiments = [
    ...state.BenchmarkConfigurationStore.chosenExperiments,
    ...state.BenchmarkConfigurationStore.chosenGoldStandards,
  ];
  return {
    ignored: availableExperiments.filter(({ id }) => !notIgnored.has(id)),
    excluded,
    included,
    counts,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): IntersectionVennDiagramDispatchProps => ({
  intersect(experiments) {
    dispatch(
      resetIntersection({
        excluded: [],
        included: experiments,
      })
    );
  },
});

const IntersectionVennDiagram = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntersectionVennDiagramView);

export default IntersectionVennDiagram;
