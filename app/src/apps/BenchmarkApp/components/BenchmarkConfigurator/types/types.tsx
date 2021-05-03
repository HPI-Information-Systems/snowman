import { ConfigurationStoreKey } from 'apps/BenchmarkApp/types/ConfigurationStoreKey';
interface ConfigurationPayload {
  key: ConfigurationStoreKey;
  payload: number;
}

// BASE CONFIGURATORS //

/// STORE ///
/*
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
};*/
/*
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
};*/
