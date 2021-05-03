import BenchmarkSelectorView from 'apps/BenchmarkApp/components/BenchmarkSelector/BenchmarkSelector.View';
import {
  BenchmarkSelectorDispatchProps,
  BenchmarkSelectorStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkSelector/BenchmarkSelectorProps';
import {
  expandAlgorithmInDataset,
  expandDataset,
  expandDatasetFull,
  selectAlgorithmInDatasetChildren,
  selectDatasetChildren,
  selectExperimentBy,
  selectNone,
  setSearchString,
  shrinkAlgorithmInDataset,
  shrinkDataset,
} from 'apps/BenchmarkApp/store/BenchmarkAppActions';
import {
  BenchmarkAppDispatch,
  BenchmarkAppModel,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (
  state: BenchmarkAppModel
): BenchmarkSelectorStateProps => ({
  algorithms: state.resources.algorithms,
  datasets: state.resources.datasets,
  experiments: state.resources.experiments,
  selectedExperimentIds: state.resources.selectedExperimentIds,
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
  expandDatasetFull(aDatasetId: number) {
    dispatch(expandDatasetFull(aDatasetId));
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
  selectNone() {
    dispatch(selectNone());
  },
});

const BenchmarkSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchmarkSelectorView);

export default BenchmarkSelector;
