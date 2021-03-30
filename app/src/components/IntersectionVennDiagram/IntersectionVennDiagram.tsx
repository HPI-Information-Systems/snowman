import IntersectionVennDiagramView from 'components/IntersectionVennDiagram/IntersectionVennDiagram.View';
import {
  IntersectionVennDiagramDispatchProps,
  IntersectionVennDiagramStateProps,
} from 'components/IntersectionVennDiagram/IntersectionVennDiagramProps';
import { sortBy } from 'lodash';
import { connect } from 'react-redux';
import {
  countsMatchConfiguration,
  resetIncludedExperiments,
} from 'store/actions/IntersectionStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

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
    dispatch(resetIncludedExperiments(experiments));
  },
});

const IntersectionVennDiagram = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntersectionVennDiagramView);

export default IntersectionVennDiagram;
