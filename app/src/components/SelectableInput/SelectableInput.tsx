import SelectableInputContainer from 'components/SelectableInput/SelectableInput.Container';
import { SelectableInputOwnProps } from 'components/SelectableInput/SelectableInputProps';
import { createSelectableInputStore } from 'components/SelectableInput/store/SelectableInputStore';
import { SelectableInputModel } from 'components/SelectableInput/types/SelectableInputModel';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

class SelectableInput extends Component<SelectableInputOwnProps> {
  store: Store<SelectableInputModel, SnowmanAction> | null = null;

  UNSAFE_componentWillMount(): void {
    this.store = createSelectableInputStore(this.props.instanceDescriptor);
  }

  componentWillUnmount(): void {
    this.store = null;
  }

  render(): JSX.Element {
    if (this.store === null) {
      return <div />;
    }
    return (
      <Provider store={this.store}>
        <SelectableInputContainer {...this.props} />
      </Provider>
    );
  }
}

export default SelectableInput;
