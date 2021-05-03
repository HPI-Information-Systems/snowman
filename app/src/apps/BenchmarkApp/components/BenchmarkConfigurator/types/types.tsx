import { ConfigurationStoreKey } from 'apps/BenchmarkApp/types/ConfigurationStoreKey';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import React from 'react';

interface ConfigurationPayload {
  key: ConfigurationStoreKey;
  payload: number;
}

// BASE CONFIGURATORS //

/// DatasetConfiguration ///

interface DatasetConfigurationActionTypes {
  CLEAR: 'DATASET_CONFIGURATION-CONFIGURATION-CLEAR';
  SET_DATASET_ID: 'DATASET_CONFIGURATION-SET_DATASET_ID';
}

/// MatchingSolutionConfiguration ///

interface MatchingSolutionConfigurationActionTypes {
  CLEAR: 'MATCHING_SOLUTION_CONFIGURATION-CLEAR';
  SET_MATCHING_SOLUTION_ID: 'MATCHING_SOLUTION_CONFIGURATION-SET_MATCHING_SOLUTION_ID';
}

/// ExperimentConfiguration ///

interface ExperimentConfigurationActionTypes {
  CLEAR: 'EXPERIMENT_CONFIGURATION-CONFIGURATION-CLEAR';
  SET_EXPERIMENT_ID: 'EXPERIMENT_CONFIGURATION-SET_EXPERIMENT_ID';
  SET_FORCE_DATASET_FILTER: 'EXPERIMENT_CONFIGURATION-SET_FORCE_DATASET_FILTER';
  SET_FORCE_MATCHING_SOLUTION_FILTER: 'EXPERIMENT_CONFIGURATION-SET_FORCE_MATCHING_SOLUTION_FILTER';
}

/// SimilarityFunctionConfiguration ///

interface SimilarityFunctionConfigurationActionTypes {
  CLEAR: 'SIMILARITY_FUNCTION_CONFIGURATION-CLEAR';
  SET_FUNCTION_ID: 'SIMILARITY_FUNCTION_CONFIGURATION-SET_FUNCTION_ID';
  SET_FORCE_EXPERIMENT_FILTER: 'SIMILARITY_FUNCTION_CONFIGURATION-SET_FORCE_EXPERIMENT_FILTER';
}

/// SimilarityThresholdConfiguration ///

interface SimilarityThresholdConfigurationActionTypes {
  CLEAR: 'SIMILARITY_THRESHOLD_CONFIGURATION-CLEAR';
  SET_THRESHOLD: 'SIMILARITY_THRESHOLD_CONFIGURATION-SET_THRESHOLD';
}

/// MultiSelectorConfiguration ///

interface MultiSelectorConfigurationActionTypes {
  CLEAR: 'MULTI_SELECTOR_CONFIGURATION-CLEAR';
  SET_NUMBER_ENTRIES: 'MULTI_SELECTOR_CONFIGURATION-SET_NUMBER_ENTRIES';
}

/// STORE ///

const configStore: ConfigurationStoreModel = {
  dataset: {
    dataset: {
      datasetId: 22,
    },
  },
  experiment: {
    goldStandard: {
      experimentId: 22,
      forceDatasetFilter: 'dataset',
    },
    benchmarkedExp: {
      experimentId: 33,
      forceDatasetFilter: 'dataset',
    },
  },
};

const MultiSelect = ({
  cacheKey,
  item,
}: {
  cacheKey: string;
  item: (cacheKey: string) => JSX.Element;
}): JSX.Element => {
  const numberElements = 23;
  const ids = new Array(numberElements)
    .fill(undefined)
    .map((_, index) => index);
  return <>{ids.map((id) => item(`${cacheKey}${id}`))}</>;
};

const SimilarityThresholdConfiguratorView = ({
  cacheKey,
}: {
  cacheKey: ConfigurationStoreKey;
}): JSX.Element => {
  return <div></div>;
};

const ExperimentConfigConfigurator = ({
  cacheKey,
}: {
  cacheKey: ConfigurationStoreKey;
}): JSX.Element => {
  return (
    <>
      <ExperimentConfigurator cacheKey={cacheKey} />
      <SimilarityFunctionConfigurator
        cacheKey={cacheKey}
        datasetFilter={cacheKey}
      />
      <MultiSelect
        cacheKey={cacheKey + 'multi'}
        item={(cacheKey) =>
          React.createElement(SimilarityThresholdConfigurator, {
            cacheKey: cacheKey,
          })
        }
      />
    </>
  );
};
