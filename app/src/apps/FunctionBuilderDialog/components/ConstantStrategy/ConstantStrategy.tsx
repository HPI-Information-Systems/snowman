import { IonChip, IonInput } from '@ionic/react';
import styles from 'apps/FunctionBuilderDialog/components/ConstantStrategy/ConstantStrategyStyles.module.css';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import React from 'react';
import { useSelector } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { parseIntRemoveNaN } from 'utils/questionHelpers';

const ConstantStrategy = ({
  blockAccessKey,
}: StrategyMapperForwardProps): JSX.Element => {
  const constVal = useSelector(
    (state: FunctionBuilderDialogModel): number | null =>
      (state.functionBuildingStack.getBlock(blockAccessKey)?.left as number) ??
      null
  );
  return (
    <IonChip outline>
      <IonInput
        className={styles.input}
        value={constVal}
        type="number"
        onIonChange={(event: IonChangeEvent): void =>
          FunctionBuildingBlockMagistrate.setLeftValue(
            blockAccessKey,
            parseIntRemoveNaN(event.detail.value) ?? null
          )
        }
      />
    </IonChip>
  );
};

export default ConstantStrategy;
