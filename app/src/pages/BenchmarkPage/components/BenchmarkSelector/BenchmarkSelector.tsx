import { prepareBenchmarkConfig } from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelector.helper';
import BenchmarkSelectorView from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelector.View';
import {
  BenchmarkSelectorDispatchProps,
  BenchmarkSelectorStateProps,
} from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelectorProps';
import {
  BenchmarkAppDispatch,
  BenchmarkAppModel,
} from 'pages/BenchmarkPage/store/BenchmarkAppModel';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: BenchmarkAppModel
): BenchmarkSelectorStateProps => ({
  config: prepareBenchmarkConfig(
    state.algorithms,
    state.datasets,
    state.experiments
  ),
});

const mapDispatchToProps = (
  dispatch: BenchmarkAppDispatch
): BenchmarkSelectorDispatchProps => ({
  expandAlgorithm(anAlgorithmId: number) {
    console.log('expand algorithm', anAlgorithmId);
  },
  expandDataset(aDatasetId: number) {
    console.log('expand dataset', aDatasetId);
  },
  selectAlgorithm(anAlgorithmId: number) {
    console.log('select algorithm', anAlgorithmId);
  },
  selectDataset(aDatasetId: number) {
    console.log('select dataset', aDatasetId);
  },
  selectExperiment(anExperimentId: number) {
    console.log('select experiment', anExperimentId);
  },
});

const BenchmarkSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchmarkSelectorView);

export default BenchmarkSelector;
