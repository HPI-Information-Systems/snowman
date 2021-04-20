import BenchmarkAppView from 'apps/BenchmarkApp/BenchmarkApp.View';
import { BenchmarkAppDispatchProps } from 'apps/BenchmarkApp/BenchmarkAppProps';
import {
  getAlgorithms,
  getDatasets,
  getExperiments,
} from 'apps/BenchmarkApp/store/BenchmarkAppThunkActions';
import { BenchmarkAppDispatch } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
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
