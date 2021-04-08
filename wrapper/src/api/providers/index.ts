import { AlgorithmProvider } from './algorithm/algorithmProvider';
import { BenchmarkProvider } from './benchmark/benchmarkProvider/benchmarkProvider';
import { DatasetProvider } from './dataset/datasetProvider';
import { ExperimentProvider } from './experiment/experimentProvider';

type Providers = {
  algorithm: AlgorithmProvider;
  dataset: DatasetProvider;
  experiment: ExperimentProvider;
  benchmark: BenchmarkProvider;
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
