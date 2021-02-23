import { AlgorithmProvider } from './algorithm/algorithmProvider';
import { BaseAlgorithmProvider } from './algorithm/baseAlgorithmProvider';
import { BaseBenchmarkProvider } from './benchmark/baseBenchmarkProvider';
import { BenchmarkProvider } from './benchmark/benchmarkProvider/benchmarkProvider';
import { BaseDatasetProvider } from './dataset/baseDatasetProvider';
import { DatasetProvider } from './dataset/datasetProvider';
import { BaseExperimentProvider } from './experiment/baseExperimentProvider';
import { ExperimentProvider } from './experiment/experimentProvider';

type Providers = {
  algorithm: BaseAlgorithmProvider;
  dataset: BaseDatasetProvider;
  experiment: BaseExperimentProvider;
  benchmark: BaseBenchmarkProvider;
};

let providers: Providers;

export function getProviders(): Providers {
  if (!providers) {
    providers = {
      algorithm: new AlgorithmProvider(),
      dataset: new DatasetProvider(),
      experiment: new ExperimentProvider(),
      benchmark: new BenchmarkProvider(),
    };
  }
  return providers;
}
