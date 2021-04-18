import DefaultAppView from 'app/App.View';
import { DefaultAppStateProps } from 'app/AppProps';
import { connect } from 'react-redux';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): DefaultAppStateProps => ({
  publicState: {
    activeApp: state.SnowmanGlobalStore.RenderLogicStore.currentViewID,
    existsActiveRequest:
      state.SnowmanGlobalStore.LoadingIndicatorStore.ongoingRequestsCount > 0,
  },
});

const DefaultApp = connect(mapStateToProps)(DefaultAppView);

export default DefaultApp;
