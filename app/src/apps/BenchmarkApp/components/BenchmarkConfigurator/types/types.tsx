import React from 'react';

type ConfigurationStoreKey = string;
interface ConfigurationPayload {
  key: ConfigurationStoreKey;
  payload: number;
}

// BASE CONFIGURATORS //

/// DatasetConfiguration ///

interface DatasetConfigurationModel {
  datasetId?: number;
}

interface DatasetConfigurationActionTypes {
  CLEAR: 'DATASET_CONFIGURATION-CONFIGURATION-CLEAR';
  SET_DATASET_ID: 'DATASET_CONFIGURATION-SET_DATASET_ID';
}

/// MatchingSolutionConfiguration ///

interface MatchingSolutionConfigurationModel {
  matchingSolutionId?: number;
}

interface MatchingSolutionConfigurationActionTypes {
  CLEAR: 'MATCHING_SOLUTION_CONFIGURATION-CLEAR';
  SET_MATCHING_SOLUTION_ID: 'MATCHING_SOLUTION_CONFIGURATION-SET_MATCHING_SOLUTION_ID';
}

/// ExperimentConfiguration ///

interface ExperimentConfigurationModel {
  experimentId?: number;
  forceDatasetFilter?: ConfigurationStoreKey;
  forceMatchingSolutionFilter?: ConfigurationStoreKey;
}

interface ExperimentConfigurationActionTypes {
  CLEAR: 'EXPERIMENT_CONFIGURATION-CONFIGURATION-CLEAR';
  SET_EXPERIMENT_ID: 'EXPERIMENT_CONFIGURATION-SET_EXPERIMENT_ID';
  SET_FORCE_DATASET_FILTER: 'EXPERIMENT_CONFIGURATION-SET_FORCE_DATASET_FILTER';
  SET_FORCE_MATCHING_SOLUTION_FILTER: 'EXPERIMENT_CONFIGURATION-SET_FORCE_MATCHING_SOLUTION_FILTER';
}

/// SimilarityFunctionConfiguration ///

interface SimilarityFunctionConfigurationModel {
  functionId: number;
  forceExperimentFilter?: ConfigurationStoreKey;
}

interface SimilarityFunctionConfigurationActionTypes {
  CLEAR: 'SIMILARITY_FUNCTION_CONFIGURATION-CLEAR';
  SET_FUNCTION_ID: 'SIMILARITY_FUNCTION_CONFIGURATION-SET_FUNCTION_ID';
  SET_FORCE_EXPERIMENT_FILTER: 'SIMILARITY_FUNCTION_CONFIGURATION-SET_FORCE_EXPERIMENT_FILTER';
}

/// SimilarityThresholdConfiguration ///

interface SimilarityThresholdConfigurationModel {
  threshold: number;
}

interface SimilarityThresholdConfigurationActionTypes {
  CLEAR: 'SIMILARITY_THRESHOLD_CONFIGURATION-CLEAR';
  SET_THRESHOLD: 'SIMILARITY_THRESHOLD_CONFIGURATION-SET_THRESHOLD';
}

/// MultiSelectorConfiguration ///

interface MultiSelectorConfigurationModel {
  numberEntries: number;
}

interface MultiSelectorConfigurationActionTypes {
  CLEAR: 'MULTI_SELECTOR_CONFIGURATION-CLEAR';
  SET_NUMBER_ENTRIES: 'MULTI_SELECTOR_CONFIGURATION-SET_NUMBER_ENTRIES';
}

/// STORE ///

type ConfigurationStoreModel = {
  dataset: { [key in ConfigurationStoreKey]: DatasetConfigurationModel };
  matchingSolution: {
    [key in ConfigurationStoreKey]: MatchingSolutionConfigurationModel;
  };
  experiment: {
    [key in ConfigurationStoreKey]: ExperimentConfigurationModel;
  };
  similarityFunction: {
    [key in ConfigurationStoreKey]: SimilarityFunctionConfigurationModel;
  };
  similarityThreshold: {
    [key in ConfigurationStoreKey]: SimilarityThresholdConfigurationModel;
  };
  multiSelector: {
    [key in ConfigurationStoreKey]: MultiSelectorConfigurationModel;
  };
};

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
