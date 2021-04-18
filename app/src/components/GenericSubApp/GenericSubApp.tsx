import GenericSubAppView from 'components/GenericSubApp/GenericSubApp.View';
import {
  GenericSubAppOwnProps,
  GenericSubAppStateProps,
} from 'components/GenericSubApp/GenericSubAppProps';
import { connect } from 'react-redux';
import { Store } from 'store/models';

const mapStateToProps = (
  state: Store,
  ownProps: GenericSubAppOwnProps
): GenericSubAppStateProps => ({
  existsActiveRequest:
    state.SnowmanGlobalStore.LoadingIndicatorStore.ongoingRequestsCount > 0,
  isSubAppActive:
    ownProps.appId === state.SnowmanGlobalStore.RenderLogicStore.currentViewID,
});

const GenericSubApp = connect(mapStateToProps)(GenericSubAppView);

export default GenericSubApp;
