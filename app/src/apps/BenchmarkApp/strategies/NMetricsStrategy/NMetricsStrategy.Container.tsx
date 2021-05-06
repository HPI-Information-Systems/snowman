import { Experiment } from 'api';
import { doOpenStrategy } from 'apps/BenchmarkApp/store/BenchmarkAppActions';
import { doPrimeExperimentSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreExperimentActions';
import NMetricsStrategyView from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategy.View';
import {
  NMetricsStrategyDispatchProps,
  NMetricsStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategyProps';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: NMetricsStrategyModel
): NMetricsStrategyStateProps => {
  return {
    metrics: state.metrics,
    experiments: state.experiments,
    goldStandard: state.goldStandard,
    isValidSelection: state.isValidConfig,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<NMetricsStrategyModel>
): NMetricsStrategyDispatchProps => ({
  inspectExperiment(anExperiment: Experiment) {
    doPrimeExperimentSelection(StoreCacheKey.experiment, anExperiment.id);
    doOpenStrategy(StrategyIDs.BinaryMetrics);
  },
});

const NMetricsStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NMetricsStrategyView);

export default NMetricsStrategyContainer;
