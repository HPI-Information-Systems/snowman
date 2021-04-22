import SelectableInputContainer from 'components/SelectableInput/SelectableInput.Container';
import { SelectableInputOwnProps } from 'components/SelectableInput/SelectableInputProps';
import { createSelectableInputStore } from 'components/SelectableInput/store/SelectableInputStore';
import { SelectableInputModel } from 'components/SelectableInput/types/SelectableInputModel';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

class SelectableInput extends Component<SelectableInputOwnProps> {
  store: Store<SelectableInputModel, SnowmanAction>;

  constructor(props: SelectableInputOwnProps) {
    super(props);
    this.store = createSelectableInputStore(props.instanceDescriptor);
  }

  render(): JSX.Element {
    return (
      <Provider store={this.store}>
        <SelectableInputContainer {...this.props} />
      </Provider>
    );
  }
}

export default SelectableInput;
