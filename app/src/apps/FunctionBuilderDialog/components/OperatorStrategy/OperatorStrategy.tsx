import { IonChip } from '@ionic/react';
import { SimilarityThresholdFunctionOperatorOperatorEnum } from 'api';
import styles from 'apps/FunctionBuilderDialog/components/OperatorStrategy/OperatorStrategyStyles.module.css';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import SelectableInput from 'components/stateful/SelectableInputFactory/flavors/SelectableInput';
import React from 'react';
import { useSelector } from 'react-redux';

const OperatorStrategy = ({
  blockAccessKey,
}: StrategyMapperForwardProps): JSX.Element => {
  const operator: string | null = useSelector(
    (state: FunctionBuilderDialogModel): string | null =>
      (state.functionBuildingStack.getBlock(blockAccessKey)?.mid as string) ??
      null
  );
  return (
    <>
      <IonChip className={styles.chip}>(</IonChip>
      <div className={styles.container}>
        <StrategyMapper
          parentAccessKey={blockAccessKey}
          ownLocation={CellDescriptor.left}
        />
      </div>
      <IonChip className={styles.chip}>
        <SelectableInput
          selection={typeof operator === 'string' ? [operator] : []}
          onChange={(selection) => {
            const operator = selection[0];
            if (operator !== undefined) {
              FunctionBuildingBlockMagistrate.setMidValue(
                blockAccessKey,
                operator as SimilarityThresholdFunctionOperatorOperatorEnum
              );
            }
          }}
          allowMultiselect={false}
          allOptions={Object.values(
            SimilarityThresholdFunctionOperatorOperatorEnum
          )}
          instanceDescriptor={`OperatorStrategy-${blockAccessKey}`}
        />
      </IonChip>
      <div className={styles.container}>
        <StrategyMapper
          parentAccessKey={blockAccessKey}
          ownLocation={CellDescriptor.right}
        />
      </div>
      <IonChip className={styles.chip}>)</IonChip>
    </>
  );
};

export default OperatorStrategy;
