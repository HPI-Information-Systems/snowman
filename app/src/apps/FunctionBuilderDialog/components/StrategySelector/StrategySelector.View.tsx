import { IonChip } from '@ionic/react';
import { StrategyDisplayNames } from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategyDisplayNames';
import { StrategySelectorProps } from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategySelectorProps';
import SelectableInput from 'components/stateful/SelectableInputFactory/flavors/SelectableInput';
import React from 'react';

const StrategySelectorView = ({
  chosenStrategyType,
  setStrategyType,
  blockAccessKey,
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
      instanceDescriptor={`StrategySelectorView-${blockAccessKey}`}
    />
  </IonChip>
);

export default StrategySelectorView;
