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
import { Store } from 'store/models';
import { IonChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (state: Store): SelectableInputStateProps => ({
  shouldShowPopover: state.SelectableInputStore.shouldShowPopover,
  eventPopover: state.SelectableInputStore.eventPopover,
  searchString: state.SelectableInputStore.searchString,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): SelectableInputDispatchProps => ({
  showPopover: (anEvent: Event) => {
    dispatch(showPopover(anEvent));
  },
  closePopover: () => {
    dispatch(closePopover());
  },
  setSearchString: (anEvent: IonChangeEvent) => {
    dispatch(setSearchString(anEvent.detail.value ?? ''));
  },
  resetElement: () => {
    dispatch(resetElement());
  },
});

const SelectableInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectableInputView);

export default SelectableInput;
