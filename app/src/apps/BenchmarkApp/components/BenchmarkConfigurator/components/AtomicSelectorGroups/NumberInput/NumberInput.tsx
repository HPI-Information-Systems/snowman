import NumberInputView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/NumberInput/NumberInput.View';
import {
  NumberInputDispatchProps,
  NumberInputOwnProps,
  NumberInputStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/NumberInput/NumberInputProps';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { getSingleItem } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: NumberInputOwnProps
): NumberInputStateProps => ({
  value: getSingleItem(ownProps.cacheKey, state.config.simThresholds),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: NumberInputOwnProps
): NumberInputDispatchProps => ({
  setValue: (event: IonChangeEvent): void => {
    const input = parseInputToNumberOrUndef(event.detail.value);
    dispatch(
      updateSelection('simThresholds', {
        aCacheKey: ownProps.cacheKey,
        newSelection: [input],
        allowMultiple: false,
      })
    );
  },
});

const NumberInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberInputView);

export default NumberInput;
