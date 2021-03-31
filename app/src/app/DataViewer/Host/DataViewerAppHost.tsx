import DataViewerAppHostView from 'app/DataViewer/Host/DataViewerAppHost.View';
import { DataViewerAppHostDispatchProps } from 'app/DataViewer/Host/DataViewerAppHostProps';
import { connect } from 'react-redux';
import { showToast } from 'store/actions/GlobalIndicatorActions';
import { SnowmanDispatch } from 'store/messages';
import { COULD_NOT_OPEN_DATA_VIEWER_IN_CHILD_WINDOW_ERROR } from 'structs/statusMessages';
import { ToastType } from 'types/ToastTypes';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DataViewerAppHostDispatchProps => ({
  couldNotOpenChildWindow() {
    dispatch(
      showToast(
        COULD_NOT_OPEN_DATA_VIEWER_IN_CHILD_WINDOW_ERROR,
        ToastType.Error
      )
    );
  },
});

export default connect(undefined, mapDispatchToProps)(DataViewerAppHostView);
