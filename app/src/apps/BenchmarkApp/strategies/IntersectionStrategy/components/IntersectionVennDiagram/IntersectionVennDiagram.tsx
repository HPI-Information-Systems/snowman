import IntersectionVennDiagramView from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/IntersectionVennDiagram.View';
import {
  IntersectionVennDiagramDispatchProps,
  IntersectionVennDiagramStateProps,
} from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/IntersectionVennDiagramProps';
import {
  countsMatchConfiguration,
  resetIncludedExperiments,
} from 'apps/BenchmarkApp/strategies/IntersectionStrategy/store/IntersectionStrategyActions';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { sortBy } from 'lodash';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = ({
  included,
  counts,
  available,
}: IntersectionStrategyModel): IntersectionVennDiagramStateProps => {
  const availableExperiments = sortBy([...available], ({ id }) => id);
  return {
    experiments: availableExperiments,
    included,
    counts,
    countsLoaded: countsMatchConfiguration(counts, availableExperiments),
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<IntersectionStrategyModel>
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
