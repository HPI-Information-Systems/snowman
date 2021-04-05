import { AlgorithmProvider } from './algorithm/algorithmProvider';
import { BenchmarkProvider } from './benchmark/benchmarkProvider/benchmarkProvider';
import { DatasetProvider } from './dataset/datasetProvider';
import { ExperimentProvider } from './experiment/experimentProvider';
import { SimilarityThresholdsProvider } from './similarityThresholds/similarityThresholdsProvider';

export const providers = {
  algorithm: new AlgorithmProvider(),
  dataset: new DatasetProvider(),
  experiment: new ExperimentProvider(),
  benchmark: new BenchmarkProvider(),
  similarityThresholds: new SimilarityThresholdsProvider(),
};
