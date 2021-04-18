import { prepareBenchmarkConfig } from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelector.helper';
import BenchmarkSelectorView from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelector.View';
import {
  BenchmarkSelectorDispatchProps,
  BenchmarkSelectorStateProps,
} from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelectorProps';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): BenchmarkSelectorStateProps => ({
  config: prepareBenchmarkConfig([], [], []),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
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
