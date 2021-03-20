import AppView from 'app/App.View';
import { AppDispatchProps, AppStateProps } from 'app/AppProps';
import { connect } from 'react-redux';
import { getAlgorithms } from 'store/actions/CoreStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): AppStateProps => ({
  currentViewId: state.RenderLogicStore.currentViewID,
});

const mapDispatchToProps = (dispatch: SnowmanDispatch): AppDispatchProps => ({
  loadInitialState() {
    dispatch(getAlgorithms()).then();
  },
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppView);

export default App;
