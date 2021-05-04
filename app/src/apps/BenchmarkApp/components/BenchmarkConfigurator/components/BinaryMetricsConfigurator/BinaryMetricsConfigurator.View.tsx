import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroup';
import getDatasetCacheKey from 'apps/BenchmarkApp/utils/getDatasetCacheKey';
import getExperimentCacheKey from 'apps/BenchmarkApp/utils/getExperimentCacheKey';
import React from 'react';

const BinaryMetricsConfiguratorView = (): JSX.Element => (
  <>
    <DatasetSelectorGroup
      getCacheKey={getDatasetCacheKey}
      allowMultiple={false}
    />
    <DatasetSelectorGroup
      getCacheKey={getExperimentCacheKey}
      allowMultiple={true}
    />
  </>
);

export default BinaryMetricsConfiguratorView;
