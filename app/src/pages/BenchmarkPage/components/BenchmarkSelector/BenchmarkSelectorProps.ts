import { Algorithm, Dataset, Experiment } from 'api';
import { ExpandedEntity } from 'pages/BenchmarkPage/types/ExpandedEntity';

export interface BenchmarkSelectorOwnProps {
  contentId: string;
}

export interface BenchmarkSelectorStateProps {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
  selectedExperiments: number[];
  expandedAlgorithmsInDatasets: ExpandedEntity[];
}

export interface BenchmarkSelectorDispatchProps {
  expandAlgorithmInDataset(aDatasetId: number, anAlgorithmId: number): void;
  shrinkAlgorithmInDataset(aDatasetId: number, anAlgorithmId: number): void;
  expandDataset(aDatasetId: number): void;
  shrinkDataset(aDatasetId: number): void;
  selectAlgorithmInDatasetChildren(
    aDatasetId: number,
    anAlgorithmId: number
  ): void;
  selectDatasetChildren(aDatasetId: number): void;
  selectExperiment(anExperimentId: number): void;
}

export type BenchmarkSelectorProps = BenchmarkSelectorOwnProps &
  BenchmarkSelectorStateProps &
  BenchmarkSelectorDispatchProps;
