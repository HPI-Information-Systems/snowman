import DefaultAppView from 'app/Default/DefaultApp.View';
import {
  DefaultAppDispatchProps,
  DefaultAppStateProps,
} from 'app/Default/DefaultAppProps';
import { connect } from 'react-redux';
import { getAlgorithms } from 'store/actions/AlgorithmsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): DefaultAppStateProps => ({
  currentViewId: state.RenderLogicStore.currentViewID,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DefaultAppDispatchProps => ({
  loadInitialState() {
    dispatch(getAlgorithms()).then();
  },
});

const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(DefaultAppView);

export default DefaultApp;
