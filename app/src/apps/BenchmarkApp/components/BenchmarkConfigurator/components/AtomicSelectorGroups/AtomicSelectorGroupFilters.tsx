import { IonList } from '@ionic/react';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import React from 'react';

const AtomicSelectorGroupFilters = ({
  viewFilters,
}: {
  viewFilters: StoreCacheKey[];
}): JSX.Element => (
  <IonList>
    <ConfiguratorItem
      title="Filter"
      configurators={viewFilters.map((key) => [key, true])}
    />
  </IonList>
);

export default AtomicSelectorGroupFilters;
