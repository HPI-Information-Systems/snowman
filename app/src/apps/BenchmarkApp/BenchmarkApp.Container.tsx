import BenchmarkAppView from 'apps/BenchmarkApp/BenchmarkApp.View';
import {
  BenchmarkAppDispatchProps,
  BenchmarkAppStateProps,
} from 'apps/BenchmarkApp/BenchmarkAppProps';
import {
  loadInitialState,
  openStrategy,
} from 'apps/BenchmarkApp/store/BenchmarkAppActions';
import {
  BenchmarkAppDispatch,
  BenchmarkAppModel,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { connect } from 'react-redux';

const mapStateToProps = (state: BenchmarkAppModel): BenchmarkAppStateProps => ({
  activeStrategy: state.activeStrategy,
});

const mapDispatchToProps = (
  dispatch: BenchmarkAppDispatch
): BenchmarkAppDispatchProps => ({
  loadInitialState: () => {
    dispatch(loadInitialState());
  },
  openStrategy(id: StrategyIDs) {
    dispatch(openStrategy(id));
  },
});

const BenchmarkAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchmarkAppView);

export default BenchmarkAppContainer;
