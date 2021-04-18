import GenericSubAppView from 'components/GenericSubApp/GenericSubApp.View';
import { GenericSubAppStateProps } from 'components/GenericSubApp/GenericSubAppProps';
import { connect } from 'react-redux';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): GenericSubAppStateProps => ({
  existsActiveRequest:
    state.SnowmanGlobalStore.LoadingIndicatorStore.ongoingRequestsCount > 0,
});

const GenericSubApp = connect(mapStateToProps)(GenericSubAppView);

export default GenericSubApp;
