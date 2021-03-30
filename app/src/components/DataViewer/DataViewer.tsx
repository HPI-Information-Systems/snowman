import DataViewerView from 'components/DataViewer/DataViewer.View';
import { DataViewerDispatchProps } from 'components/DataViewer/DataViewerProps';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import RequestHandler from 'utils/requestHandler';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DataViewerDispatchProps => ({
  wrapLoadTuples(loadTuples, start, stop) {
    return RequestHandler(() => loadTuples(start, stop), dispatch);
  },
});

const DataViewer = connect(undefined, mapDispatchToProps)(DataViewerView);

export default DataViewer;
