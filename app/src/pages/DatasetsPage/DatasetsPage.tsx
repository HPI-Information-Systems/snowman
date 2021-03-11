import { Dataset } from 'api';
import DatasetsPageView from 'pages/DatasetsPage/DatasetsPage.View';
import {
  DatasetsPageDispatchProps,
  DatasetsPageStateProps,
} from 'pages/DatasetsPage/DatasetsPageProps';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/DatasetDialogStoreActions';
import {
  clickOnDataset,
  clickOnDatasetTag,
  deleteDataset,
  getDatasets,
} from 'store/actions/DatasetsStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { MagicNotPossibleId } from 'structs/constants';
import { Option } from 'types/Option';
import { doesDatasetMatchTags } from 'utils/datasetHelper';
import { getTagsFromDatasets } from 'utils/tagFactory';

const mapStateToProps = (state: Store): DatasetsPageStateProps => ({
  selectedTags: state.DatasetsStore.selectedDatasetTags,
  tags: getTagsFromDatasets(state.DatasetsStore.datasets),
  datasets: state.DatasetsStore.datasets
    .filter((aDataset: Dataset): boolean =>
      doesDatasetMatchTags(aDataset, state.DatasetsStore.selectedDatasetTags)
    )
    .map(
      (aDataset: Dataset): Option => ({
        id: aDataset.id,
        title: aDataset.name,
        description: aDataset.description,
        subtitle: (aDataset?.tags ?? []).join(', ').toUpperCase(),
        tags: [
          `Total: ${aDataset.numberOfRecords ?? 'unknown'}`,
          `Uploaded: ${aDataset.numberOfUploadedRecords ?? 'none'}`,
        ],
      })
    ),
  selectedDataset: [
    state.DatasetsStore.selectedDataset?.id ?? MagicNotPossibleId,
  ],
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DatasetsPageDispatchProps => ({
  clickOnTag(aTag: string): void {
    dispatch(clickOnDatasetTag(aTag));
  },
  clickOnDataset(aDatasetId: number): void {
    dispatch(clickOnDataset(aDatasetId));
  },
  loadDatasets() {
    dispatch(getDatasets()).then();
  },
  deleteDataset(aDatasetId: number) {
    dispatch(deleteDataset(aDatasetId)).then();
  },
  editDataset(aDatasetId: number) {
    dispatch(openChangeDialog(aDatasetId)).then();
  },
});

const DatasetsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsPageView);

export default DatasetsPage;
