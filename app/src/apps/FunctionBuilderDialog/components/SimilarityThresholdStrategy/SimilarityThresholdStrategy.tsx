import { IonChip } from '@ionic/react';
import { useInstanceDescriptor } from 'apps/BenchmarkApp/utils/useInstanceDescriptor';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import SelectableInput from 'components/stateful/SelectableInputFactory/flavors/SelectableInput';
import React from 'react';
import { useSelector } from 'react-redux';

const SimilarityThresholdStrategy = ({
  blockAccessKey,
}: StrategyMapperForwardProps): JSX.Element => {
  const thresholdValue = useSelector(
    (state: FunctionBuilderDialogModel): string | null =>
      (state.functionBuildingStack.getBlock(blockAccessKey)?.left as string) ??
      null
  );
  const availableThresholdValues = useSelector(
    (state: FunctionBuilderDialogModel): string[] => state.experimentColumns
  );
  return (
    <IonChip outline>
      <SelectableInput
        instanceDescriptor={useInstanceDescriptor()}
        allOptions={availableThresholdValues}
        selection={typeof thresholdValue === 'string' ? [thresholdValue] : []}
        allowMultiselect={false}
        onChange={(selection) =>
          FunctionBuildingBlockMagistrate.setLeftValue(
            blockAccessKey,
            selection[0] ?? null
          )
        }
      />
    </IonChip>
  );
};

export default SimilarityThresholdStrategy;
