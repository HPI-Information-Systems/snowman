import DataViewerView from 'components/DataViewer/DataViewer.View';
import { DataViewerDispatchProps } from 'components/DataViewer/DataViewerProps';
import { connect } from 'react-redux';
import RequestHandler from 'utils/requestHandler';

const mapDispatchToProps = (): DataViewerDispatchProps => ({
  wrapLoadTuples(loadTuples, start, stop) {
    return RequestHandler(() => loadTuples(start, stop));
  },
});

const DataViewer = connect(undefined, mapDispatchToProps)(DataViewerView);

export default DataViewer;
