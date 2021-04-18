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

export interface BenchmarkSelectorOwnProps {
  contentId: string;
}

export interface BenchmarkSelectorStateProps {
  config: BenchmarkSelectorConfig;
}

export interface BenchmarkSelectorDispatchProps {
  expandAlgorithm(anAlgorithmId: number): void;
  expandDataset(aDatasetId: number): void;
  selectAlgorithm(anAlgorithmId: number): void;
  selectDataset(aDatasetId: number): void;
  selectExperiment(anExperimentId: number): void;
}

export type BenchmarkSelectorProps = BenchmarkSelectorOwnProps &
  BenchmarkSelectorStateProps &
  BenchmarkSelectorDispatchProps;
