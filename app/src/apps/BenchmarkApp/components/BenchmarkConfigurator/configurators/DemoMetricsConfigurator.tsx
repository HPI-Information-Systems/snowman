import { IonList } from '@ionic/react';
import { getCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MULTI_SELECTOR_INCREMENT_ID } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const DemoMetricsConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.Dashboard}>
    <IonList>
      <ConfiguratorItem
        title="1a. Select Threshold"
        configurators={[
          [
            getCacheKey(
              StoreCacheKeyBaseEnum.multiSelect,
              ...getCacheKey(
                StoreCacheKeyBaseEnum.group,
                [MULTI_SELECTOR_INCREMENT_ID],
                getCacheKey(
                  StoreCacheKeyBaseEnum.dataset,
                  MULTI_SELECTOR_INCREMENT_ID
                ),
                getCacheKey(
                  StoreCacheKeyBaseEnum.multiSelect,
                  ...getCacheKey(
                    StoreCacheKeyBaseEnum.group,
                    [MULTI_SELECTOR_INCREMENT_ID, MULTI_SELECTOR_INCREMENT_ID],
                    getCacheKey(
                      StoreCacheKeyBaseEnum.experiment,
                      MULTI_SELECTOR_INCREMENT_ID,
                      MULTI_SELECTOR_INCREMENT_ID
                    ),
                    getCacheKey(
                      StoreCacheKeyBaseEnum.similarityFunction,
                      MULTI_SELECTOR_INCREMENT_ID,
                      MULTI_SELECTOR_INCREMENT_ID
                    ),
                    getCacheKey(
                      StoreCacheKeyBaseEnum.similarityThreshold,
                      MULTI_SELECTOR_INCREMENT_ID,
                      MULTI_SELECTOR_INCREMENT_ID
                    )
                  )
                )
              )
            ),
            true,
          ],
        ]}
      />
    </IonList>
  </GenericConfigurator>
);

export default DemoMetricsConfigurator;
