import BenchmarkSelectorView from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelector.View';
import {
  BenchmarkSelectorDispatchProps,
  BenchmarkSelectorStateProps,
} from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelectorProps';
import {
  expandAlgorithmInDataset,
  expandDataset,
  selectAlgorithmInDatasetChildren,
  selectDatasetChildren,
  selectExperimentBy,
  setSearchString,
  shrinkAlgorithmInDataset,
  shrinkDataset,
} from 'pages/BenchmarkPage/store/BenchmarkAppActions';
import {
  BenchmarkAppDispatch,
  BenchmarkAppModel,
} from 'pages/BenchmarkPage/types/BenchmarkAppModel';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (
  state: BenchmarkAppModel
): BenchmarkSelectorStateProps => ({
  algorithms: state.algorithms,
  datasets: state.datasets,
  experiments: state.experiments,
  selectedExperimentIds: state.selectedExperimentIds,
  expandedAlgorithmsInDatasets: state.expandedAlgorithmsInDatasets,
  searchString: state.searchString,
});

const mapDispatchToProps = (
  dispatch: BenchmarkAppDispatch
): BenchmarkSelectorDispatchProps => ({
  expandAlgorithmInDataset(aDatasetId: number, anAlgorithmId: number) {
    dispatch(expandAlgorithmInDataset(aDatasetId, anAlgorithmId));
  },
  shrinkAlgorithmInDataset(aDatasetId: number, anAlgorithmId: number) {
    dispatch(shrinkAlgorithmInDataset(aDatasetId, anAlgorithmId));
  },
  expandDataset(aDatasetId: number) {
    dispatch(expandDataset(aDatasetId));
  },
  shrinkDataset(aDatasetId: number) {
    dispatch(shrinkDataset(aDatasetId));
  },
  selectAlgorithmInDatasetChildren(aDatasetId: number, anAlgorithmId: number) {
    dispatch(selectAlgorithmInDatasetChildren(aDatasetId, anAlgorithmId));
  },
  selectDatasetChildren(aDatasetId: number) {
    dispatch(selectDatasetChildren(aDatasetId));
  },
  selectExperiment(anExperimentId: number) {
    dispatch(selectExperimentBy(anExperimentId));
  },
  setSearchString(event: IonChangeEvent) {
    dispatch(setSearchString(event.detail.value ?? ''));
  },
});

const BenchmarkSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchmarkSelectorView);

export default BenchmarkSelector;
