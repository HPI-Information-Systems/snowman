import DatasetCardView from 'components/DatasetCard/DatasetCard.View';
import {
  DatasetCardDispatchProps,
  DatasetCardOwnProps,
  DatasetCardStateProps,
} from 'components/DatasetCard/DatasetCardProps';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/DatasetDialogStoreActions';
import { openPreviewer } from 'store/actions/DatasetPreviewerActions';
import {
  clickOnDataset,
  deleteDataset,
} from 'store/actions/DatasetsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { MagicNotPossibleId } from 'structs/constants';
import { couldPreviewDataset } from 'utils/datasetHelper';

const mapStateToProps = (
  state: Store,
  ownProps: DatasetCardOwnProps
): DatasetCardStateProps => ({
  couldPreview: couldPreviewDataset(ownProps.dataset),
  isSelected:
    (state.BenchmarkConfigurationStore.selectedDataset?.id ??
      MagicNotPossibleId) === ownProps.dataset.id,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: DatasetCardOwnProps
): DatasetCardDispatchProps => ({
  selectDataset() {
    dispatch(clickOnDataset(ownProps.dataset));
  },
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
