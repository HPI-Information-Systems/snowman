import DatasetCardView from 'apps/DatasetsApp/components/DatasetCard/DatasetCard.View';
import {
  DatasetCardDispatchProps,
  DatasetCardOwnProps,
  DatasetCardStateProps,
} from 'apps/DatasetsApp/components/DatasetCard/DatasetCardProps';
import { doDeleteDataset } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/DatasetDialogStoreActions';
import { openPreviewer } from 'store/actions/DatasetPreviewerActions';
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
    doDeleteDataset(ownProps.dataset.id).then();
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
