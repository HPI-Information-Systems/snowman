import { SelectableInputView } from 'components/SelectableInput/SelectableInput.View';
import {
  SelectableInputDispatchProps,
  SelectableInputStateProps,
} from 'components/SelectableInput/SelectableInputProps';
import {
  closePopover,
  resetElement,
  setSearchString,
  showPopover,
} from 'components/SelectableInput/store/SelectableInputActions';
import { SelectableInputModel } from 'components/SelectableInput/types/SelectableInputModel';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: SelectableInputModel
): SelectableInputStateProps => ({
  shouldShowPopover: state.shouldShowPopover,
  eventPopover: state.eventPopover,
  searchString: state.searchString,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SelectableInputModel>
): SelectableInputDispatchProps => ({
  showPopover: (anEvent: Event): void => {
    dispatch(showPopover(anEvent));
  },
  closePopover: (): void => {
    dispatch(closePopover());
  },
  changeSearchString: (anEvent: IonChangeEvent): void => {
    dispatch(setSearchString(anEvent.detail.value ?? ''));
  },
  resetElement: (): void => {
    dispatch(resetElement());
  },
});

const SelectableInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectableInputView);

export default SelectableInputContainer;
