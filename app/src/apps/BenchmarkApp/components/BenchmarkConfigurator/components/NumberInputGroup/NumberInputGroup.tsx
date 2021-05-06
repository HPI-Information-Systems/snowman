import NumberInputGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/NumberInputGroup/NumberInputGroup.View';
import {
  NumberInputGroupDispatchProps,
  NumberInputGroupOwnProps,
  NumberInputGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/NumberInputGroup/NumberInputGroupProps';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: NumberInputGroupOwnProps
): NumberInputGroupStateProps => ({
  value: 0,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: NumberInputGroupOwnProps
): NumberInputGroupDispatchProps => ({
  setValue: (event: IonChangeEvent): void => {
    parseInputToNumberOrUndef(event.detail.value);
  },
});

const NumberInputGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberInputGroupView);

export default NumberInputGroup;
