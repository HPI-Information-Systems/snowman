import BlockingLoadingView from 'apps/SnowmanApp/components/BlockingLoading/BlockingLoading.View';
import { BlockingLoadingStateProps } from 'apps/SnowmanApp/components/BlockingLoading/BlockingLoadingProps';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: SnowmanAppModel
): BlockingLoadingStateProps => ({
  showLoading: state.ActionLogicStore.showLoading,
});

const BlockingLoading = connect(mapStateToProps)(BlockingLoadingView);

export default BlockingLoading;
