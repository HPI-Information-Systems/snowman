import { Algorithm, Dataset, Experiment } from 'api';
import {
  BenchmarkAlgorithmConfig,
  BenchmarkDatasetConfig,
  BenchmarkExperimentConfig,
  BenchmarkSelectorConfig,
} from 'components/BenchmarkSelector/BenchmarkSelectorProps';

export const prepareBenchmarkConfig = (
  algorithms: Algorithm[],
  datasets: Dataset[],
  experiments: Experiment[]
): BenchmarkSelectorConfig => {
  return {
    algorithms: algorithms.map(
      (anAlgorithm: Algorithm): BenchmarkAlgorithmConfig => ({
        entity: anAlgorithm,
        isSelected: false,
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
                    anExperiment.datasetId === aDataset.id
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
