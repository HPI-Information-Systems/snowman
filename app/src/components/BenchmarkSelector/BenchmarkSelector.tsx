import { prepareBenchmarkConfig } from 'components/BenchmarkSelector/BenchmarkSelector.helper';
import BenchmarkSelectorView from 'components/BenchmarkSelector/BenchmarkSelector.View';
import {
  BenchmarkSelectorDispatchProps,
  BenchmarkSelectorStateProps,
} from 'components/BenchmarkSelector/BenchmarkSelectorProps';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): BenchmarkSelectorStateProps => ({
  config: prepareBenchmarkConfig(
    state.CoreStore.algorithms,
    state.CoreStore.datasets,
    state.CoreStore.experiments
  ),
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
