import DataViewerView from 'components/DataViewer/DataViewer.View';
import {
  DataViewerDispatchProps,
  DataViewerOwnProps,
  DataViewerStateProps,
} from 'components/DataViewer/DataViewerProps';
import { connect } from 'react-redux';
import { reloadTuples, resetDataViewer } from 'store/actions/DataViewerActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): DataViewerStateProps => ({
  data: state.DataViewerStore.dataToShow,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: DataViewerOwnProps
): DataViewerDispatchProps => ({
  resetDataViewer() {
    dispatch(resetDataViewer());
  },
  handleLoadTuples({
    startIndex,
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }): Promise<void> {
    return dispatch(reloadTuples(startIndex, stopIndex, ownProps.loadTuples));
  },
});

const DataViewer = connect(mapStateToProps, mapDispatchToProps)(DataViewerView);

export default DataViewer;
