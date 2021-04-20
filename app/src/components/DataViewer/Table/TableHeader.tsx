import TableHeaderView from 'components/DataViewer/Table/TableHeader.View';
import {
  TableHeaderDispatchProps,
  TableHeaderOwnProps,
  TableHeaderStateProps,
} from 'components/DataViewer/Table/TableProps';
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

const mapStateToProps = (): TableHeaderStateProps => ({
  isStandalone: true,
});

const TableHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableHeaderView);

export default TableHeader;
