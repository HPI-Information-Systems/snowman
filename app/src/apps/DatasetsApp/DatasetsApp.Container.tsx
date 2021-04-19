import { Dataset } from 'api';
import DatasetsAppView from 'apps/DatasetsApp/DatasetsApp.View';
import {
  DatasetAppOwnProps,
  DatasetsAppDispatchProps,
  DatasetsAppStateProps,
} from 'apps/DatasetsApp/DatasetsAppProps';
import { toggleTag } from 'apps/DatasetsApp/store/DatasetsAppActions';
import {
  DatasetsAppDispatch,
  DatasetsAppModel,
} from 'apps/DatasetsApp/types/DatasetsAppModel';
import { difference } from 'lodash';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: DatasetsAppModel,
  ownProps: DatasetAppOwnProps
): DatasetsAppStateProps => ({
  selectedTags: state.selectedTags,
  currentDatasets: ownProps.datasets.filter(
    (aDataset: Dataset): boolean =>
      difference(state.selectedTags, aDataset.tags ?? []).length === 0
  ),
});

const mapDispatchToProps = (
  dispatch: DatasetsAppDispatch
): DatasetsAppDispatchProps => ({
  clickOnTag(aTag: string): void {
    dispatch(toggleTag(aTag));
  },
});

const DatasetsAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsAppView);

export default DatasetsAppContainer;
