import AddFabView from 'components/AddFab/AddFab.View';
import { AddFabDispatchProps } from 'components/AddFab/AddFabProps';
import { connect } from 'react-redux';
import { openAddDialog } from 'store/actions/ExperimentDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AddFabDispatchProps => ({
  clickOnFab: (): void => dispatch(openAddDialog()),
});

const AddExperimentFab = connect(null, mapDispatchToProps)(AddFabView);

export default AddExperimentFab;
