import IntersectionVennDiagramView from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/IntersectionVennDiagram.View';
import {
  IntersectionVennDiagramDispatchProps,
  IntersectionVennDiagramStateProps,
} from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/IntersectionVennDiagramProps';
import {
  countsMatchConfiguration,
  intersectionSorter,
  resetIncludedExperiments,
} from 'apps/BenchmarkApp/strategies/IntersectionStrategy/store/IntersectionStrategyActions';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { experimentEntityToExperimentConfigItem } from 'apps/BenchmarkApp/utils/experimentEntity';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = ({
  included,
  counts,
  available,
}: IntersectionStrategyModel): IntersectionVennDiagramStateProps => {
  const experiments = available
    .slice()
    .sort((e1, e2) =>
      intersectionSorter(
        experimentEntityToExperimentConfigItem(e1),
        experimentEntityToExperimentConfigItem(e2)
      )
    );
  return {
    experiments,
    included,
    counts,
    countsLoaded: countsMatchConfiguration(counts, experiments),
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
