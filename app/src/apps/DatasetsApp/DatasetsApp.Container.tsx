import DatasetsAppView from 'apps/DatasetsApp/DatasetsApp.View';
import {
  DatasetAppOwnProps,
  DatasetsAppDispatchProps,
  DatasetsAppStateProps,
} from 'apps/DatasetsApp/DatasetsAppProps';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (
  state: Store,
  ownProps: DatasetAppOwnProps
): DatasetsAppStateProps => ({
  selectedTags: [],
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DatasetsAppDispatchProps => ({
  clickOnTag(aTag: string): void {
    console.log('click on a tag', aTag);
  },
});

const DatasetsAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsAppView);

export default DatasetsAppContainer;
