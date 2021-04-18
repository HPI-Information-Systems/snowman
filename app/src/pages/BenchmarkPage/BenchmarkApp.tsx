import BenchmarkAppView from 'pages/BenchmarkPage/BenchmarkApp.View';
import { BenchmarkAppDispatchProps } from 'pages/BenchmarkPage/BenchmarkAppProps';
import { BenchmarkAppDispatch } from 'pages/BenchmarkPage/store/BenchmarkAppModel';
import {
  getAlgorithms,
  getDatasets,
  getExperiments,
} from 'pages/BenchmarkPage/store/BenchmarkAppThunkActions';
import { connect } from 'react-redux';

const mapDispatchToProps = (
  dispatch: BenchmarkAppDispatch
): BenchmarkAppDispatchProps => ({
  loadInitialState: () => {
    dispatch(getAlgorithms()).then();
    dispatch(getDatasets()).then();
    dispatch(getExperiments()).then();
  },
});

const BenchmarkApp = connect(null, mapDispatchToProps)(BenchmarkAppView);

export default BenchmarkApp;
