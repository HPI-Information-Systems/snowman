import { IonList } from '@ionic/react';
import { getCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const DemoMetricsConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.Dashboard}>
    <IonList>
      <ConfiguratorItem
        title="1. Select Dataset"
        configurators={[[getCacheKey(StoreCacheKeyBaseEnum.dataset), false]]}
      />
      <ConfiguratorItem
        title="1a. Select Threshold"
        configurators={[
          [
            getCacheKey(
              StoreCacheKeyBaseEnum.multiSelect,
              ...getCacheKey(StoreCacheKeyBaseEnum.similarityThreshold)
            ),
            true,
          ],
        ]}
      />
      <ConfiguratorItem
        title="1a. Select Dataset32"
        configurators={[
          [
            getCacheKey(
              StoreCacheKeyBaseEnum.multiSelect,
              ...getCacheKey(StoreCacheKeyBaseEnum.dataset)
            ),
            true,
          ],
        ]}
      />
      <ConfiguratorItem
        title="1. Select Dataset"
        configurators={[[getCacheKey(StoreCacheKeyBaseEnum.dataset), false]]}
      />
    </IonList>
  </GenericConfigurator>
);

export default DemoMetricsConfigurator;
