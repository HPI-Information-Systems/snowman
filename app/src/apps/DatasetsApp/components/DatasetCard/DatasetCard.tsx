import DatasetCardView from 'apps/DatasetsApp/components/DatasetCard/DatasetCard.View';
import {
  DatasetCardDispatchProps,
  DatasetCardOwnProps,
  DatasetCardStateProps,
} from 'apps/DatasetsApp/components/DatasetCard/DatasetCardProps';
import { DatasetsAppModel } from 'apps/DatasetsApp/types/DatasetsAppModel';
import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';
import { doDeleteDataset } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { ViewIDs } from 'types/ViewIDs';
import { couldPreviewDataset } from 'utils/datasetHelper';

const mapStateToProps = (
  _: never,
  ownProps: DatasetCardOwnProps
): DatasetCardStateProps => ({
  couldPreview: couldPreviewDataset(ownProps.dataset),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<DatasetsAppModel>,
  ownProps: DatasetCardOwnProps
): DatasetCardDispatchProps => ({
  deleteDataset() {
    doDeleteDataset(ownProps.dataset.id).then();
  },
  editDataset() {
    doOpenDialog(ViewIDs.DatasetDialog, ownProps.dataset.id);
  },
  previewDataset() {
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
