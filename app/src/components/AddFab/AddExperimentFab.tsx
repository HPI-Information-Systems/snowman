import AddFab from 'components/AddFab/AddFab';
import { AddFabDispatchProps } from 'components/AddFab/AddFabProps';
import { connect } from 'react-redux';
import { openAddDialog } from 'store/actions/ExperimentDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AddFabDispatchProps => ({
  clickOnFab: (): void => dispatch(openAddDialog()),
});

const AddExperimentFab = connect(null, mapDispatchToProps)(AddFab);

export default AddExperimentFab;
