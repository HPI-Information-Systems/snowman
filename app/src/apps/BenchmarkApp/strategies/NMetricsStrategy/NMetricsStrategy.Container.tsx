import { Experiment } from 'api';
import { getCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MULTI_SELECTOR_START } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import { doOpenStrategy } from 'apps/BenchmarkApp/store/BenchmarkAppActions';
import { doPrimeSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreActions';
import NMetricsStrategyView from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategy.View';
import {
  NMetricsStrategyDispatchProps,
  NMetricsStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategyProps';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: NMetricsStrategyModel
): NMetricsStrategyStateProps => {
  return {
    metrics: state.metrics,
    experiments: state.experiments,
    goldStandard: state.groundTruth,
    isValidSelection: state.isValidConfig,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<NMetricsStrategyModel>
): NMetricsStrategyDispatchProps => ({
  inspectExperiment(anExperiment: Experiment) {
    doPrimeSelection({
      aCacheKey: getCacheKey(
        StoreCacheKeyBaseEnum.experiment,
        MULTI_SELECTOR_START,
        MULTI_SELECTOR_START
      ),
      selectFirst: anExperiment.id,
    });
    doOpenStrategy(StrategyIDs.BinaryMetrics);
  },
});

const NMetricsStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NMetricsStrategyView);

export default NMetricsStrategyContainer;
