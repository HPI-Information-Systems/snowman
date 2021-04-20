import { SelectableInputView } from 'components/SelectableInput/SelectableInput.View';
import {
  SelectableInputDispatchProps,
  SelectableInputStateProps,
} from 'components/SelectableInput/SelectableInputProps';
import { connect } from 'react-redux';
import {
  closePopover,
  resetElement,
  setSearchString,
  showPopover,
} from 'store/actions/SelectableInputStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';
import { IonChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (state: ImmediateStore): SelectableInputStateProps => ({
  shouldShowPopover: state.SelectableInputStore.shouldShowPopover,
  eventPopover: state.SelectableInputStore.eventPopover,
  searchString: state.SelectableInputStore.searchString,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
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

const SelectableInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectableInputView);

export default SelectableInput;
