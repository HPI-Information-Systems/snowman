import { IonList } from '@ionic/react';
import AlgorithmSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AlgorithmSelectorGroup';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ExperimentSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup';
import SimFunctionSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/SimFunctionSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import NumberInputGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/NumberInputGroup/NumberInputGroup';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const DemoMetricsConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.Dashboard}>
    <IonList>
      <ConfiguratorItem title="1. Select Dataset">
        <DatasetSelectorGroup
          cacheKey={StoreCacheKey.dataset}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="1a. Select Threshold">
        <NumberInputGroup cacheKey={StoreCacheKey.threshold} />
      </ConfiguratorItem>
      <ConfiguratorItem title="1b. Select Threshold">
        <NumberInputGroup cacheKey={StoreCacheKey.threshold} />
      </ConfiguratorItem>
      <ConfiguratorItem title="2. Select Datasets">
        <DatasetSelectorGroup
          cacheKey={StoreCacheKey.dataset}
          allowMultiple={true}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="3. Select Algorithms">
        <AlgorithmSelectorGroup
          cacheKey={StoreCacheKey.algorithm}
          allowMultiple={true}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="4. Select Experiments">
        <ExperimentSelectorGroup
          cacheKey={StoreCacheKey.experiment}
          allowMultiple={true}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="5. Select Ground Truth">
        <ExperimentSelectorGroup
          cacheKey={StoreCacheKey.groundTruth}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="6. Select Experiment">
        <ExperimentSelectorGroup
          cacheKey={StoreCacheKey.experiment}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="6a. Select SimFunction">
        <SimFunctionSelectorGroup
          cacheKey={StoreCacheKey.simFunction}
          allowMultiple={false}
        />
      </ConfiguratorItem>
    </IonList>
  </GenericConfigurator>
);

export default DemoMetricsConfigurator;
