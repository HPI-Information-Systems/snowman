import DatasetCardView from 'apps/DatasetsApp/components/DatasetCard/DatasetCard.View';
import {
  DatasetCardDispatchProps,
  DatasetCardOwnProps,
  DatasetCardStateProps,
} from 'apps/DatasetsApp/components/DatasetCard/DatasetCardProps';
import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';
import { doDeleteDataset } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';
import { ViewIDs } from 'types/ViewIDs';
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
    doOpenDialog(ViewIDs.DatasetDialog, ownProps.dataset.id);
  },
  previewDataset() {
    console.log('dispatch(openPreviewer(ownProps.dataset))');
    doOpenDialog(
      ViewIDs.PreviewDialog,
      ownProps.dataset.id,
      PreviewDialogTypes.DATASET
    );
  },
});

const DatasetCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetCardView);

export default DatasetCard;
