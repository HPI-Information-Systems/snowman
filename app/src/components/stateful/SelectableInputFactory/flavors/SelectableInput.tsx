import SelectableInputFactory from 'components/stateful/SelectableInputFactory/SelectableInputFactory';
import { GenericStoreComponentProps } from 'utils/GenericStoreComponentFactory';

export interface SelectableInputOwnProps extends GenericStoreComponentProps {
  selection: string[];
  allOptions: string[];
  allowMultiselect: boolean;
  onChange: (newSelection: string[]) => void;
}

const SelectableInput = SelectableInputFactory<string>() as (
  props: SelectableInputOwnProps
) => JSX.Element;

export default SelectableInput;
