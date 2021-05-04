import SelectorPopoverGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup.View';
import {
  SelectorPopoverGroupDispatchProps,
  SelectorPopoverGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroupProps';
import {
  closePopover,
  showPopover,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/store/SelectorPopoverGroupActions';
import { SelectorPopoverGroupModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/types/SelectorPopoverGroupModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = ({
  isOpen,
}: SelectorPopoverGroupModel): SelectorPopoverGroupStateProps => ({
  isOpen,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SelectorPopoverGroupModel>
): SelectorPopoverGroupDispatchProps => ({
  close: () => dispatch(closePopover()),
  open: (event: MouseEvent) => dispatch(showPopover(event)),
});

const SelectorPopoverGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectorPopoverGroupView);

export default SelectorPopoverGroup;
