import { Algorithm, Dataset, Experiment } from 'api';
import { ExpandedEntity } from 'pages/BenchmarkPage/types/ExpandedEntity';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface BenchmarkSelectorOwnProps {
  contentId: string;
}

export interface BenchmarkSelectorStateProps {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
  selectedExperiments: number[];
  expandedAlgorithmsInDatasets: ExpandedEntity[];
  searchString: string;
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
  setSearchString(event: IonChangeEvent): void;
}

export type BenchmarkSelectorProps = BenchmarkSelectorOwnProps &
  BenchmarkSelectorStateProps &
  BenchmarkSelectorDispatchProps;
