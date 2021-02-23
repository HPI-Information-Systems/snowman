import GlobalToastView from 'components/GlobalToast/GlobalToast.View';
import {
  GlobalToastDispatchProps,
  GlobalToastOwnProps,
} from 'components/GlobalToast/GlobalToastProps';
import { connect } from 'react-redux';
import { hideToast } from 'store/actions/GlobalIndicatorActions';
import { SnowmanDispatch } from 'store/messages';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: GlobalToastOwnProps
): GlobalToastDispatchProps => ({
  close(): void {
    dispatch(hideToast(ownProps.toastId));
  },
});

const GlobalToast = connect(null, mapDispatchToProps)(GlobalToastView);

export default GlobalToast;
