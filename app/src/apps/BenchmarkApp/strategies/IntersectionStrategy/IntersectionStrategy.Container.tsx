import IntersectionStrategyView from 'apps/BenchmarkApp/strategies/IntersectionStrategy/IntersectionStrategy.View';
import {
  IntersectionStrategyDispatchProps,
  IntersectionStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/IntersectionStrategy/IntersectionStrategyProps';
import {
  countsMatchConfiguration,
  getCountsForIntersection,
  intersectionSorter,
  intersectionTuplesLoader,
  loadCounts,
} from 'apps/BenchmarkApp/strategies/IntersectionStrategy/store/IntersectionStrategyActions';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { connect } from 'react-redux';
import { MagicNotPossibleId } from 'structs/constants';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = ({
  available,
  included,
  excluded,
  ignored,
  counts,
}: IntersectionStrategyModel): IntersectionStrategyStateProps => {
  const sortedConfig = [
    ...included.map(({ id }) => ({
      experimentId: id,
      predictedCondition: true,
    })),
    ...excluded.map(({ id }) => ({
      experimentId: id,
      predictedCondition: false,
    })),
  ].sort(intersectionSorter);
  const configCounts = getCountsForIntersection(counts, sortedConfig);

  //Todo: Validate dataset

  return {
    loadTuples: intersectionTuplesLoader(
      sortedConfig,
      available[0]?.id ?? MagicNotPossibleId
    ),
    tuplesCount: configCounts?.numberRows ?? 0,
    pairCount: configCounts?.numberPairs ?? 0,
    included,
    excluded,
    ignored: ignored,
    countsLoaded: countsMatchConfiguration(counts, available),
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<IntersectionStrategyModel>
): IntersectionStrategyDispatchProps => {
  return {
    loadCounts() {
      return dispatch(loadCounts());
    },
  };
};

const IntersectionStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntersectionStrategyView);

export default IntersectionStrategyContainer;
