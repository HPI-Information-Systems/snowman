import { IonList } from '@ionic/react';
import { getCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MULTI_SELECTOR_START } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const BinaryMetricsConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.BinaryMetrics}>
    <IonList>
      <ConfiguratorItem
        title="1. Select Dataset"
        configurators={[
          [
            getCacheKey(StoreCacheKeyBaseEnum.dataset, MULTI_SELECTOR_START),
            false,
          ],
        ]}
      />
      <ConfiguratorItem
        title="2. Select Ground Truth"
        configurators={[
          [
            getCacheKey(
              StoreCacheKeyBaseEnum.groundTruth,
              MULTI_SELECTOR_START
            ),
            false,
          ],
        ]}
      />
      <ConfiguratorItem
        title="3. Select Experiment"
        configurators={[
          [
            getCacheKey(
              StoreCacheKeyBaseEnum.experiment,
              MULTI_SELECTOR_START,
              MULTI_SELECTOR_START
            ),
            false,
          ],
        ]}
      />
    </IonList>
  </GenericConfigurator>
);

export default BinaryMetricsConfigurator;
