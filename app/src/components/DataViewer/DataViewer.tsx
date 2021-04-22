import DataViewerView from 'components/DataViewer/DataViewer.View';
import { DataViewerDispatchProps } from 'components/DataViewer/DataViewerProps';
import { connect } from 'react-redux';
import { TuplesLoader } from 'types/TuplesLoader';
import RequestHandler from 'utils/requestHandler';

const mapDispatchToProps = (): DataViewerDispatchProps => ({
  // TODO: push it to DataViewer.View
  wrapLoadTuples(loadTuples: TuplesLoader, start: number, stop: number) {
    return RequestHandler(() => loadTuples(start, stop));
  },
});

const DataViewer = connect(undefined, mapDispatchToProps)(DataViewerView);

export default DataViewer;
