import { Experiment } from 'api';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { buildAnyConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/builder';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { doOpenStrategy } from 'apps/BenchmarkApp/store/BenchmarkAppActions';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { moveValueFront } from 'apps/BenchmarkApp/store/ConfigurationStore/MultiSelectorActions';
import NMetricsStrategyView from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategy.View';
import {
  NMetricsStrategyDispatchProps,
  NMetricsStrategyStateProps,
} from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategyProps';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { connect } from 'react-redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: NMetricsStrategyModel
): NMetricsStrategyStateProps => {
  return {
    metrics: state.metrics,
    experiments: state.experiments.map(
      (anEntity): Experiment => anEntity.experiment
    ),
    goldStandard: state.groundTruth?.experiment,
    isValidSelection: state.isValidConfig,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<NMetricsStrategyModel>
): NMetricsStrategyDispatchProps => ({
  inspectExperiment(anExperiment: Experiment) {
    BenchmarkAppStoreMagistrate.getStore().dispatch(
      (moveValueFront(
        buildAnyConfigurator(
          [
            [
              StoreCacheKeyBaseEnum.experiment,
              StoreCacheKeyBaseEnum.experiment,
            ],
          ],
          []
        ).cacheKey as StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>,
        anExperiment.id
      ) as unknown) as SnowmanAction<unknown>
    );
    doOpenStrategy(StrategyIDs.BinaryMetrics);
  },
});

const NMetricsStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NMetricsStrategyView);

export default NMetricsStrategyContainer;
