import { IonList } from '@ionic/react';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { AtomicSelectorGroup } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import React from 'react';

const AtomicSelectorGroupFilters = ({
  viewFilters,
}: {
  viewFilters: StoreCacheKey[];
}): JSX.Element => (
  <IonList>
    <ConfiguratorItem title="Filter">
      <IonList>
        {viewFilters.map((filter, index) => (
          <AtomicSelectorGroup
            key={index}
            cacheKey={filter}
            allowMultiple={true}
          />
        ))}
      </IonList>
    </ConfiguratorItem>
  </IonList>
);

export default AtomicSelectorGroupFilters;
