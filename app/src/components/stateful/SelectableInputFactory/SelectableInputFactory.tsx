import { SelectableInputView } from 'components/stateful/SelectableInputFactory/SelectableInputFactory.View';
import {
  SelectableInputDispatchProps,
  SelectableInputOwnProps,
  SelectableInputStateProps,
} from 'components/stateful/SelectableInputFactory/SelectableInputFactoryProps';
import {
  closePopover,
  resetElement,
  setSearchString,
  showPopover,
} from 'components/stateful/SelectableInputFactory/store/SelectableInputActions';
import { SelectableInputStoreMagistrate } from 'components/stateful/SelectableInputFactory/store/SelectableInputStore';
import { SelectableInputModel } from 'components/stateful/SelectableInputFactory/types/SelectableInputModel';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import GenericStoreComponentFactory from 'utils/GenericStoreComponentFactory';

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

function SelectableInputFactory<Content>(): (
  props: SelectableInputOwnProps<Content>
) => JSX.Element {
  return GenericStoreComponentFactory<
    SelectableInputModel,
    SelectableInputOwnProps<Content>
  >(
    SelectableInputStoreMagistrate,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SelectableInputView) as React.FC<SelectableInputOwnProps<Content>>
  );
}
export default SelectableInputFactory;
