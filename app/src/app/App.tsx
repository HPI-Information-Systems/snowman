import AppView from 'app/App.View';
import { AppDispatchProps, AppStateProps } from 'app/AppProps';
import { connect } from 'react-redux';
import { getAlgorithms } from 'store/actions/AlgorithmsStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapDispatchToProps = (dispatch: SnowmanDispatch): AppDispatchProps => ({
  loadInitialState() {
    dispatch(getAlgorithms()).then();
  },
});

const mapStateToProps = (state: Store): AppStateProps => ({
  toastStack: state.GlobalIndicatorStore.currentToasts,
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppView);

export default App;
