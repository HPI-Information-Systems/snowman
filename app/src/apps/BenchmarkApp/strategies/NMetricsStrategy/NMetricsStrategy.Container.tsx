import { Experiment } from 'api';
import {
  getCacheKey,
  getCacheKeyAndFilter,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { buildAnyConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/builder';
import { MULTI_SELECTOR_START } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { doOpenStrategy } from 'apps/BenchmarkApp/store/BenchmarkAppActions';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreActions';
import { getMultiSelectConfiguration } from 'apps/BenchmarkApp/store/ConfigurationStore/MultiSelectorActions';
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

const moveExperimentConfigFront = (swapExperimentId: number): void => {
  // TODO this only looks for experiment id and not similarity function / threshold - this means the wrong sim function / threshold may be swapped
  const appStore = BenchmarkAppStoreMagistrate.getStore();
  const state = appStore.getState();
  const firstExperiment = buildAnyConfigurator(
    [[StoreCacheKeyBaseEnum.experiment]],
    []
  );
  const firstSimilarityFunction = buildAnyConfigurator(
    [[StoreCacheKeyBaseEnum.similarityFunction]],
    []
  );
  const firstSimilarityThreshold = buildAnyConfigurator(
    [[StoreCacheKeyBaseEnum.similarityThreshold]],
    []
  );
  const swapExperimentCacheKey = getCacheKey(
    StoreCacheKeyBaseEnum.experiment,
    MULTI_SELECTOR_START,
    swapExperimentId
  );
  const swapExperimentValue = getCacheKeyAndFilter(
    swapExperimentCacheKey
  ).getValue(state);
  const swapSimilarityFunctionCacheKey = getCacheKey(
    StoreCacheKeyBaseEnum.similarityFunction,
    MULTI_SELECTOR_START,
    swapExperimentId
  );
  const swapSimilarityFunctionValue = getCacheKeyAndFilter(
    swapSimilarityFunctionCacheKey
  ).getValue(state);
  const swapSimilarityThresholdCacheKey = getCacheKey(
    StoreCacheKeyBaseEnum.similarityThreshold,
    MULTI_SELECTOR_START,
    swapExperimentId
  );
  const swapSimilarityThresholdValue = getCacheKeyAndFilter(
    swapSimilarityThresholdCacheKey
  ).getValue(state);
  const dispatch = appStore.dispatch;
  dispatch(
    (updateSelection({
      aCacheKey: swapExperimentCacheKey,
      newSelection: firstExperiment.getValue(state),
      allowMultiple: true,
    }) as unknown) as SnowmanAction<unknown>
  );
  dispatch(
    (updateSelection({
      aCacheKey: swapSimilarityFunctionCacheKey,
      newSelection: firstSimilarityFunction.getValue(state),
      allowMultiple: true,
    }) as unknown) as SnowmanAction<unknown>
  );
  dispatch(
    (updateSelection({
      aCacheKey: swapSimilarityThresholdCacheKey,
      newSelection: firstSimilarityThreshold.getValue(state),
      allowMultiple: true,
    }) as unknown) as SnowmanAction<unknown>
  );
  dispatch(
    (updateSelection({
      aCacheKey: firstExperiment.cacheKey,
      newSelection: swapExperimentValue,
      allowMultiple: true,
    }) as unknown) as SnowmanAction<unknown>
  );
  dispatch(
    (updateSelection({
      aCacheKey: firstSimilarityFunction.cacheKey,
      newSelection: swapSimilarityFunctionValue,
      allowMultiple: true,
    }) as unknown) as SnowmanAction<unknown>
  );
  dispatch(
    (updateSelection({
      aCacheKey: firstSimilarityThreshold.cacheKey,
      newSelection: swapSimilarityThresholdValue,
      allowMultiple: true,
    }) as unknown) as SnowmanAction<unknown>
  );
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<NMetricsStrategyModel>
): NMetricsStrategyDispatchProps => ({
  inspectExperiment(anExperiment: Experiment) {
    const experimentMultiSelect = buildAnyConfigurator(
      [[StoreCacheKeyBaseEnum.experiment, StoreCacheKeyBaseEnum.experiment]],
      []
    );
    const state = BenchmarkAppStoreMagistrate.getStore().getState();
    const swapExperimentId = getMultiSelectConfiguration(
      experimentMultiSelect.cacheKey as StoreCacheKey<StoreCacheKeyBaseEnum.multiSelect>,
      state
    ).currentIds[
      experimentMultiSelect
        .getValue(state)
        .findIndex(([id]) => id === anExperiment.id)
    ];
    moveExperimentConfigFront(swapExperimentId);
    doOpenStrategy(StrategyIDs.BinaryMetrics);
  },
});

const NMetricsStrategyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NMetricsStrategyView);

export default NMetricsStrategyContainer;
