import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import GenericSubAppView from 'components/GenericSubApp/GenericSubApp.View';
import { GenericSubAppStateProps } from 'components/GenericSubApp/GenericSubAppProps';
import { connect } from 'react-redux';

const mapStateToProps = (state: SnowmanAppModel): GenericSubAppStateProps => ({
  existsActiveRequest: state.ActionLogicStore.ongoingRequestsCount > 0,
  activeApp: state.RenderLogicStore.currentViewID,
});

const GenericSubApp = connect(mapStateToProps)(GenericSubAppView);

export default GenericSubApp;
