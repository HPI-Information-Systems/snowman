import BenchmarkAppView from 'pages/BenchmarkPage/BenchmarkApp.View';
import { BenchmarkAppDispatchProps } from 'pages/BenchmarkPage/BenchmarkAppProps';
import {
  getAlgorithms,
  getDatasets,
  getExperiments,
} from 'pages/BenchmarkPage/store/BenchmarkAppThunkActions';
import { BenchmarkAppDispatch } from 'pages/BenchmarkPage/types/BenchmarkAppModel';
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

const BenchmarkAppContainer = connect(
  null,
  mapDispatchToProps
)(BenchmarkAppView);

export default BenchmarkAppContainer;
