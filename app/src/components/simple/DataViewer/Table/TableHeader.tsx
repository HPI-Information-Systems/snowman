import TableHeaderView from 'components/simple/DataViewer/Table/TableHeader.View';
import {
  TableHeaderDispatchProps,
  TableHeaderOwnProps,
} from 'components/simple/DataViewer/Table/TableProps';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  { openDataViewerWindow }: TableHeaderOwnProps
): TableHeaderDispatchProps => ({
  performOpenDataViewerWindow() {
    dispatch(openDataViewerWindow());
  },
});

const TableHeader = connect(undefined, mapDispatchToProps)(TableHeaderView);

export default TableHeader;
