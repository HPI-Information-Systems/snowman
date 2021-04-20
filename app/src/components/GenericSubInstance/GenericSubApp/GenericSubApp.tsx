import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import GenericSubAppView from 'components/GenericSubInstance/GenericSubApp/GenericSubApp.View';
import { GenericSubAppStateProps } from 'components/GenericSubInstance/GenericSubApp/GenericSubAppProps';
import { connect } from 'react-redux';

const mapStateToProps = (state: SnowmanAppModel): GenericSubAppStateProps => ({
  existsActiveRequest: state.ActionLogicStore.ongoingRequestsCount > 0,
  activeApp: state.RenderLogicStore.currentViewID,
  centralResources: state.CentralResourcesStore,
});

const GenericSubApp = connect(mapStateToProps)(GenericSubAppView);

export default GenericSubApp;
