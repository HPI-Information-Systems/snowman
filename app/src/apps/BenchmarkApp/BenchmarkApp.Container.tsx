import BenchmarkAppView from 'apps/BenchmarkApp/BenchmarkApp.View';
import {
  BenchmarkAppDispatchProps,
  BenchmarkAppStateProps,
} from 'apps/BenchmarkApp/BenchmarkAppProps';
import {
  getAlgorithms,
  getDatasets,
  getExperiments,
} from 'apps/BenchmarkApp/store/BenchmarkAppThunkActions';
import {
  BenchmarkAppDispatch,
  BenchmarkAppModel,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { connect } from 'react-redux';

const mapStateToProps = (state: BenchmarkAppModel): BenchmarkAppStateProps => ({
  currentStrategy: state.usedStrategy,
});

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
  mapStateToProps,
  mapDispatchToProps
)(BenchmarkAppView);

export default BenchmarkAppContainer;
