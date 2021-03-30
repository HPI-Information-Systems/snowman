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
import { store } from 'components/InputChip/store/InputChipStore';
import {
  InputChipDispatch,
  InputChipStore,
} from 'components/InputChip/store/models';
import React from 'react';
import { KeyboardEvent } from 'react';
import { connect, Provider } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (state: InputChipStore): InputChipStateProps => ({
  value: state.inputValue,
  shouldShowInput: state.shouldShowInput,
});

const mapDispatchToProps = (
  dispatch: InputChipDispatch,
  ownProps: InputChipOwnProps
): InputChipDispatchProps => ({
  onChangeValue(event: IonChangeEvent): void {
    dispatch(changeInputValue(event.detail.value as string));
  },
  showInput(): void {
    dispatch(showInput());
    console.log('open');
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

const InputChipHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputChipView);

const InputChip = (ownProps: InputChipOwnProps): JSX.Element => (
  <Provider store={store}>
    <InputChipHOC {...ownProps} />
  </Provider>
);

export default InputChip;
