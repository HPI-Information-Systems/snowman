import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import React from 'react';
import { useSelector } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';

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
      <IonSelect
        placeholder="?"
        value={availableThresholdValues.length > 0 ? thresholdValue ?? '' : ''}
        onIonChange={(event: IonChangeEvent): void =>
          FunctionBuildingBlockMagistrate.setLeftValue(
            blockAccessKey,
            event.detail.value ?? null
          )
        }
      >
        {availableThresholdValues.map(
          (aValue: string): JSX.Element => (
            <IonSelectOption value={aValue} key={aValue}>
              {aValue}
            </IonSelectOption>
          )
        )}
      </IonSelect>
    </IonChip>
  );
};

export default SimilarityThresholdStrategy;
