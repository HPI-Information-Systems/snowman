import SelectorPopoverGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup.View';
import {
  SelectorPopoverGroupDispatchProps,
  SelectorPopoverGroupOwnProps,
  SelectorPopoverGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroupProps';
import {
  closePopover,
  showPopover,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/store/SelectorPopoverGroupActions';
import { SelectorPopoverGroupStoreMagistrate } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/store/SelectorPopoverGroupStore';
import { SelectorPopoverGroupModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/types/SelectorPopoverGroupModel';
import GenericStoreComponentFactory from 'components/generics/GenericStoreComponent/GenericStoreComponent';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = ({
  isOpen,
  eventPopover,
}: SelectorPopoverGroupModel): SelectorPopoverGroupStateProps => ({
  isOpen,
  event: eventPopover,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SelectorPopoverGroupModel>
): SelectorPopoverGroupDispatchProps => ({
  close: () => dispatch(closePopover()),
  open: (event: MouseEvent) => dispatch(showPopover(event)),
});

const SelectorPopoverGroup = GenericStoreComponentFactory<
  SelectorPopoverGroupModel,
  SelectorPopoverGroupOwnProps
>(
  SelectorPopoverGroupStoreMagistrate,
  connect(mapStateToProps, mapDispatchToProps)(SelectorPopoverGroupView)
);

export default SelectorPopoverGroup;
