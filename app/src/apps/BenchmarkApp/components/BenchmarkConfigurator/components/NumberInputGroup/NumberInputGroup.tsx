import NumberInputGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/NumberInputGroup/NumberInputGroup.View';
import {
  NumberInputGroupDispatchProps,
  NumberInputGroupOwnProps,
  NumberInputGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/NumberInputGroup/NumberInputGroupProps';
import { updateSimThresholdValue } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreSimThresholdActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { getSingleItem } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: NumberInputGroupOwnProps
): NumberInputGroupStateProps => ({
  value: getSingleItem(ownProps.cacheKey, state.config.simThresholds),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: NumberInputGroupOwnProps
): NumberInputGroupDispatchProps => ({
  setValue: (event: IonChangeEvent): void => {
    const input = parseInputToNumberOrUndef(event.detail.value);
    dispatch(
      updateSimThresholdValue({ aCacheKey: ownProps.cacheKey, newValue: input })
    );
  },
});

const NumberInputGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberInputGroupView);

export default NumberInputGroup;
