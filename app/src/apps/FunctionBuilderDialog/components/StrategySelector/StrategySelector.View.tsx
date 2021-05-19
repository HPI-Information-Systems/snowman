import { IonChip } from '@ionic/react';
import { useInstanceDescriptor } from 'apps/BenchmarkApp/utils/useInstanceDescriptor';
import { StrategyDisplayNames } from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategyDisplayNames';
import { StrategySelectorProps } from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategySelectorProps';
import SelectableInput from 'components/stateful/SelectableInputFactory/flavors/SelectableInput';
import React from 'react';

const StrategySelectorView = ({
  chosenStrategyType,
  setStrategyType,
}: StrategySelectorProps): JSX.Element => (
  <IonChip color="danger">
    <SelectableInput
      selection={
        typeof chosenStrategyType === 'string' ? [chosenStrategyType] : []
      }
      allOptions={Object.keys(StrategyDisplayNames)}
      allowMultiselect={false}
      onChange={(selection) => {
        const functionBuildingBlockType = selection[0];
        if (functionBuildingBlockType !== undefined) {
          setStrategyType(StrategyDisplayNames[functionBuildingBlockType]);
        }
      }}
      instanceDescriptor={useInstanceDescriptor()}
    />
  </IonChip>
);

export default StrategySelectorView;
