import TableHeaderView from 'components/DataViewer/Table/TableHeader.View';
import {
  TableHeaderDispatchProps,
  TableHeaderOwnProps,
  TableHeaderStateProps,
} from 'components/DataViewer/Table/TableProps';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { ViewIDs } from 'types/ViewIDs';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  { openDataViewerWindow }: TableHeaderOwnProps
): TableHeaderDispatchProps => ({
  performOpenDataViewerWindow() {
    dispatch(openDataViewerWindow());
  },
});

const mapStateToProps = (state: Store): TableHeaderStateProps => ({
  isStandalone:
    state.RenderLogicStore.currentViewID === ViewIDs.STANDALONE_DATA_VIEWER,
});

const TableHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableHeaderView);

export default TableHeader;
