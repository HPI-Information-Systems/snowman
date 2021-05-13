import { ExperimentIntersectionItem } from 'api';
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
import { experimentEntityToExperimentConfigItem } from 'apps/BenchmarkApp/utils/experimentEntity';
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
  const sortedConfig: ExperimentIntersectionItem[] = [
    ...included.map((entity) => ({
      ...experimentEntityToExperimentConfigItem(entity),
      predictedCondition: true,
    })),
    ...excluded.map((entity) => ({
      ...experimentEntityToExperimentConfigItem(entity),
      predictedCondition: false,
    })),
  ].sort(intersectionSorter);
  const configCounts = getCountsForIntersection(counts, sortedConfig);

  return {
    isValidConfig,
    loadTuples:
      available[0] !== undefined
        ? intersectionTuplesLoader(
            sortedConfig,
            available[0].experiment.datasetId
          )
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
