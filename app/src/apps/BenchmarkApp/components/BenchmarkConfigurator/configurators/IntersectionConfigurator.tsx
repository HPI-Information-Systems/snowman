import { IonList } from '@ionic/react';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ExperimentSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const IntersectionConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.NaryIntersection}>
    <IonList>
      <ConfiguratorItem title="1. Select Dataset">
        <DatasetSelectorGroup
          cacheKey={StoreCacheKey.dataset}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="2. Select Experiments">
        <ExperimentSelectorGroup
          cacheKey={StoreCacheKey.experiment}
          allowMultiple={true}
        />
      </ConfiguratorItem>
    </IonList>
  </GenericConfigurator>
);

export default IntersectionConfigurator;
