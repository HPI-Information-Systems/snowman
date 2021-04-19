import SnowmanAppView from 'apps/SnowmanApp/SnowmanApp.View';
import { SnowmanAppDispatchProps } from 'apps/SnowmanApp/SnowmanAppProps';
import { refreshCentralResources } from 'apps/SnowmanApp/store/CentralResourcesActions';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SnowmanAppModel>
): SnowmanAppDispatchProps => ({
  refreshCentralResources() {
    dispatch(refreshCentralResources()).then();
  },
});

const SnowmanAppContainer = connect(null, mapDispatchToProps)(SnowmanAppView);

export default SnowmanAppContainer;
