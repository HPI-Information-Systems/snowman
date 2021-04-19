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
    console.log('expand algorithm', anAlgorithmId, 'in', aDatasetId);
    dispatch(expandAlgorithmInDataset(aDatasetId, anAlgorithmId));
  },
  shrinkAlgorithmInDataset(aDatasetId: number, anAlgorithmId: number) {
    console.log('shrink algorithm', anAlgorithmId, 'in', aDatasetId);
    dispatch(shrinkAlgorithmInDataset(aDatasetId, anAlgorithmId));
  },
  expandDataset(aDatasetId: number) {
    console.log('expand dataset', aDatasetId);
    dispatch(expandDataset(aDatasetId));
  },
  shrinkDataset(aDatasetId: number) {
    console.log('shrink dataset', aDatasetId);
    dispatch(shrinkDataset(aDatasetId));
  },
  selectAlgorithmInDatasetChildren(aDatasetId: number, anAlgorithmId: number) {
    console.log('select algorithm', anAlgorithmId, 'in', aDatasetId);
    dispatch(selectAlgorithmInDatasetChildren(aDatasetId, anAlgorithmId));
  },
  selectDatasetChildren(aDatasetId: number) {
    console.log('select dataset', aDatasetId);
    dispatch(selectDatasetChildren(aDatasetId));
  },
  selectExperiment(anExperimentId: number) {
    console.log('select experiment', anExperimentId);
    dispatch(selectExperimentBy(anExperimentId));
  },
  setSearchString(event: IonChangeEvent) {
    console.log('set search string', event.detail.value);
    dispatch(setSearchString(event.detail.value ?? ''));
  },
});

const BenchmarkSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchmarkSelectorView);

export default BenchmarkSelector;
