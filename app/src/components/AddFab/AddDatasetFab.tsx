import AddFab from 'components/AddFab/AddFab';
import { AddFabDispatchProps } from 'components/AddFab/AddFabProps';
import { connect } from 'react-redux';
import { openAddDialog } from 'store/actions/DatasetDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AddFabDispatchProps => ({
  clickOnFab: (): void => dispatch(openAddDialog()),
});

const AddDatasetFab = connect(null, mapDispatchToProps)(AddFab);

export default AddDatasetFab;
