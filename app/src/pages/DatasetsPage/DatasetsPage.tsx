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
  clickOnDatasetCategory,
  deleteDataset,
  getDatasets,
} from 'store/actions/DatasetsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { MagicNotPossibleId } from 'structs/constants';
import { doesDatasetMatchTags } from 'utils/datasetHelper';
import { getTagsFromDatasets } from 'utils/tagFactory';

const mapStateToProps = (state: Store): DatasetsPageStateProps => ({
  selectedTags: state.BenchmarkConfigurationStore.selectedDatasetCategories,
  tags: getTagsFromDatasets(state.CoreStore.datasets),
  datasets: state.CoreStore.datasets.filter((aDataset: Dataset): boolean =>
    doesDatasetMatchTags(
      aDataset,
      state.BenchmarkConfigurationStore.selectedDatasetCategories
    )
  ),
  selectedDataset: [
    state.BenchmarkConfigurationStore.selectedDataset?.id ?? MagicNotPossibleId,
  ],
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DatasetsPageDispatchProps => ({
  clickOnTag(aTag: string): void {
    dispatch(clickOnDatasetCategory(aTag));
  },
  clickOnDataset(aDataset: Dataset): void {
    dispatch(clickOnDataset(aDataset));
  },
  loadDatasets() {
    dispatch(getDatasets()).then();
  },
  deleteDataset(aDataset: Dataset) {
    dispatch(deleteDataset(aDataset)).then();
  },
  editDataset(aDataset: Dataset) {
    dispatch(openChangeDialog(aDataset)).then();
  },
});

const DatasetsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsPageView);

export default DatasetsPage;
