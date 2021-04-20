import InputChipView from 'components/InputChip/InputChip.View';
import {
  InputChipDispatchProps,
  InputChipOwnProps,
  InputChipStateProps,
} from 'components/InputChip/InputChipProps';
import {
  changeInputValue,
  handleKeyboardInteraction,
  hideInput,
  showInput,
  submitValue,
} from 'components/InputChip/store/InputChipActions';
import { InputChipModel } from 'components/InputChip/types/InputChipModel';
import { KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (state: InputChipModel): InputChipStateProps => ({
  value: state.inputValue,
  shouldShowInput: state.shouldShowInput,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<InputChipModel>,
  ownProps: InputChipOwnProps
): InputChipDispatchProps => ({
  onChangeValue(event: IonChangeEvent): void {
    dispatch(changeInputValue(event.detail.value as string));
  },
  showInput(): void {
    dispatch(showInput());
  },
  hideInput(): void {
    dispatch(hideInput());
  },
  submitInput(): void {
    dispatch(submitValue(ownProps.submitValueCallback));
  },
  handleKeyboardInteraction(event: KeyboardEvent<HTMLIonInputElement>) {
    dispatch(handleKeyboardInteraction(event, ownProps.submitValueCallback));
  },
});

const InputChipContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputChipView);

export default InputChipContainer;
