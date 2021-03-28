import { sortBy } from 'lodash';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

import {
  countsMatchConfiguration,
  resetIntersection,
} from '../../store/actions/IntersectionStoreActions';
import IntersectionVennDiagramView from './IntersectionVennDiagram.View';
import {
  IntersectionVennDiagramDispatchProps,
  IntersectionVennDiagramStateProps,
} from './IntersectionVennDiagramProps';

const mapStateToProps = ({
  IntersectionStore: { included, counts },
  BenchmarkConfigurationStore: { chosenGoldStandards, chosenExperiments },
}: Store): IntersectionVennDiagramStateProps => {
  const availableExperiments = sortBy(
    [...chosenExperiments, ...chosenGoldStandards],
    ({ id }) => id
  );
  return {
    experiments: availableExperiments,
    included,
    counts,
    countsLoaded: countsMatchConfiguration(counts, availableExperiments),
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
