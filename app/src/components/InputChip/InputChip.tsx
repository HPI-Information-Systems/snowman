import InputChipContainer from 'components/InputChip/InputChip.Container';
import { InputChipOwnProps } from 'components/InputChip/InputChipProps';
import { createInputChipStore } from 'components/InputChip/store/InputChipStore';
import { InputChipModel } from 'components/InputChip/types/InputChipModel';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

const inputChipStores = new Map<string, Store<InputChipModel, SnowmanAction>>();

const undefID = 'undef';

class InputChip extends Component<InputChipOwnProps> {
  store: Store<InputChipModel, SnowmanAction>;

  constructor(props: InputChipOwnProps) {
    super(props);
    const existingStore = inputChipStores.get(
      this.props.instanceDescriptor ?? undefID
    );
    this.store =
      existingStore ?? createInputChipStore(this.props.instanceDescriptor);
    inputChipStores.set(this.props.instanceDescriptor ?? undefID, this.store);
  }

  render(): JSX.Element {
    return (
      <Provider store={this.store}>
        <InputChipContainer {...this.props} />
      </Provider>
    );
  }
}

export default InputChip;
