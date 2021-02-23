import InputChipView from 'components/InputChip/InputChip.View';
import {
  InputChipDispatchProps,
  InputChipOwnProps,
  InputChipStateProps,
} from 'components/InputChip/InputChipProps';
import { connect } from 'react-redux';
import {
  changeInputValue,
  hideInput,
  showInput,
} from 'store/actions/InputChipStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { store } from 'store/store';
import { IonChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (state: Store): InputChipStateProps => ({
  value: state.InputChipStore.newChipValue,
  shouldShowInput: state.InputChipStore.shouldShowInput,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: InputChipOwnProps
): InputChipDispatchProps => ({
  onChangeValue(event: IonChangeEvent): void {
    dispatch(changeInputValue(event.detail.value as string));
  },
  showInput() {
    dispatch(showInput());
  },
  hideInput() {
    dispatch(hideInput());
  },
  onSubmit() {
    // call adding routine from higher hierarchy
    ownProps.addNewTag(store.getState().InputChipStore.newChipValue);
    dispatch(hideInput());
  },
});

const InputChip = connect(mapStateToProps, mapDispatchToProps)(InputChipView);

export default InputChip;
