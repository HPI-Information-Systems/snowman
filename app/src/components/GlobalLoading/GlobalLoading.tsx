import GlobalLoadingView from 'components/GlobalLoading/GlobalLoading.View';
import { GlobalLoadingStateProps } from 'components/GlobalLoading/GlobalLoadingProps';
import { connect } from 'react-redux';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): GlobalLoadingStateProps => ({
  showLoading: state.GlobalIndicatorStore.showLoading,
});

const GlobalToast = connect(mapStateToProps)(GlobalLoadingView);

export default GlobalToast;
