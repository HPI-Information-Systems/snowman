import { Algorithm, Dataset, Experiment } from 'api';

export interface BenchmarkExperimentConfig {
  entity: Experiment;
  isSelected: boolean;
}

export interface BenchmarkDatasetConfig {
  entity: Dataset;
  isSelected: boolean;
  isExpanded: boolean;
  experiments: BenchmarkExperimentConfig[];
}

export interface BenchmarkAlgorithmConfig {
  entity: Algorithm;
  isSelected: boolean;
  isExpanded: boolean;
  datasets: BenchmarkDatasetConfig[];
}

export interface BenchmarkSelectorConfig {
  algorithms: BenchmarkAlgorithmConfig[];
}

export const prepareBenchmarkConfig = (
  algorithms: Algorithm[],
  datasets: Dataset[],
  experiments: Experiment[]
): BenchmarkSelectorConfig => {
  return {
    algorithms: algorithms.map(
      (anAlgorithm: Algorithm): BenchmarkAlgorithmConfig => ({
        entity: anAlgorithm,
        isSelected: true,
        isExpanded: true,
        datasets: datasets
          .filter(
            (aDataset: Dataset): boolean =>
              experiments.findIndex(
                (anExperiment: Experiment): boolean =>
                  anExperiment.datasetId === aDataset.id &&
                  anExperiment.algorithmId === anAlgorithm.id
              ) > -1
          )
          .map(
            (aDataset: Dataset): BenchmarkDatasetConfig => ({
              entity: aDataset,
              isSelected: false,
              isExpanded: true,
              experiments: experiments
                .filter(
                  (anExperiment: Experiment): boolean =>
                    anExperiment.datasetId === aDataset.id &&
                    anExperiment.algorithmId === anAlgorithm.id
                )
                .map(
                  (anExperiment: Experiment): BenchmarkExperimentConfig => ({
                    entity: anExperiment,
                    isSelected: false,
                  })
                ),
            })
          ),
      })
    ),
  };
};
