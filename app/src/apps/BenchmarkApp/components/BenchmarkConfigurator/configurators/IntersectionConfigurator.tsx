import { IonList } from '@ionic/react';
import { getCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const IntersectionConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.NaryIntersection}>
    <IonList>
      <ConfiguratorItem
        title="1. Select Dataset"
        configurators={[[getCacheKey(StoreCacheKeyBaseEnum.dataset), false]]}
      />
      <ConfiguratorItem
        title="2. Select Experiments"
        configurators={[[getCacheKey(StoreCacheKeyBaseEnum.experiment), true]]}
      />
    </IonList>
  </GenericConfigurator>
);

export default IntersectionConfigurator;
