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
} from 'apps/BenchmarkApp/strategies/IntersectionStrategy/store/IntersectionStrategyActions';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { dummyTuplesLoader } from 'utils/tuplesLoaders';

const mapStateToProps = ({
  isValidConfig,
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
    isValidConfig: isValidConfig,
    loadTuples:
      available[0]?.id !== undefined
        ? intersectionTuplesLoader(sortedConfig, available[0].id)
        : dummyTuplesLoader,
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
      console.log('do we need this?');
    },
  };
};

const IntersectionStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntersectionStrategyView);

export default IntersectionStrategyContainer;
