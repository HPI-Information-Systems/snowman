import AppView from 'app/App.View';
import { AppDispatchProps } from 'app/AppProps';
import { connect } from 'react-redux';
import { getAlgorithms } from 'store/actions/AlgorithmsStoreActions';
import { SnowmanDispatch } from 'store/messages';

const mapDispatchToProps = (dispatch: SnowmanDispatch): AppDispatchProps => ({
  loadInitialState() {
    dispatch(getAlgorithms()).then();
  },
});

const App = connect(null, mapDispatchToProps)(AppView);

export default App;
