import DatasetCardView from 'components/DatasetCard/DatasetCard.View';
import {
  DatasetCardDispatchProps,
  DatasetCardOwnProps,
  DatasetCardStateProps,
} from 'components/DatasetCard/DatasetCardProps';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/DatasetDialogStoreActions';
import { openPreviewer } from 'store/actions/DatasetPreviewerActions';
import { deleteDataset } from 'store/actions/DatasetsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';
import { couldPreviewDataset } from 'utils/datasetHelper';

const mapStateToProps = (
  state: ImmediateStore,
  ownProps: DatasetCardOwnProps
): DatasetCardStateProps => ({
  couldPreview: couldPreviewDataset(ownProps.dataset),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: DatasetCardOwnProps
): DatasetCardDispatchProps => ({
  deleteDataset() {
    dispatch(deleteDataset(ownProps.dataset)).then();
  },
  editDataset() {
    dispatch(openChangeDialog(ownProps.dataset)).then();
  },
  previewDataset() {
    dispatch(openPreviewer(ownProps.dataset));
  },
});

const DatasetCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetCardView);

export default DatasetCard;
