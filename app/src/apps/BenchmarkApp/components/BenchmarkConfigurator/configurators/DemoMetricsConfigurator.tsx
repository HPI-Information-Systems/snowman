import { IonList } from '@ionic/react';
import { getCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import AlgorithmSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AlgorithmSelectorGroup';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ExperimentSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup';
import NumberInput from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/NumberInput/NumberInput';
import SimFunctionSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/SimFunctionSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const DemoMetricsConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.Dashboard}>
    <IonList>
      <ConfiguratorItem title="1. Select Dataset">
        <DatasetSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.dataset)}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="1a. Select Threshold">
        <NumberInput
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.similarityThreshold)}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="1b. Select Threshold">
        <NumberInput
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.similarityThreshold)}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="2. Select Datasets">
        <DatasetSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.dataset)}
          allowMultiple={true}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="3. Select Algorithms">
        <AlgorithmSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.algorithm)}
          allowMultiple={true}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="4. Select Experiments">
        <ExperimentSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.experiment)}
          allowMultiple={true}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="5. Select Ground Truth">
        <ExperimentSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.groundTruth)}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="6. Select Experiment">
        <ExperimentSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.experiment)}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="6a. Select SimFunction">
        <SimFunctionSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.similarityFunction)}
          allowMultiple={false}
        />
      </ConfiguratorItem>
    </IonList>
  </GenericConfigurator>
);

export default DemoMetricsConfigurator;
