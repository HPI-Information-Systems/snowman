import { IonChip } from '@ionic/react';
import { SimilarityThresholdFunctionUnaryOperatorOperatorEnum } from 'api';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import styles from 'apps/FunctionBuilderDialog/components/UnaryOperatorStrategy/UnaryOperatorStrategyStyles.module.css';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import SelectableInput from 'components/stateful/SelectableInputFactory/flavors/SelectableInput';
import React from 'react';
import { useSelector } from 'react-redux';

const UnaryOperatorStrategy = ({
  blockAccessKey,
}: StrategyMapperForwardProps): JSX.Element => {
  const operator: string | null = useSelector(
    (state: FunctionBuilderDialogModel): string | null =>
      (state.functionBuildingStack.getBlock(blockAccessKey)?.left as string) ??
      null
  );
  return (
    <>
      <IonChip className={styles.chip}>
        <SelectableInput
          selection={typeof operator === 'string' ? [operator] : []}
          allOptions={Object.values(
            SimilarityThresholdFunctionUnaryOperatorOperatorEnum
          )}
          allowMultiselect={false}
          onChange={(selection) =>
            FunctionBuildingBlockMagistrate.setLeftValue(
              blockAccessKey,
              selection[0] ?? null
            )
          }
          instanceDescriptor={`UnaryOperatorStrategy-${blockAccessKey}`}
        />
        (
      </IonChip>
      <StrategyMapper
        parentAccessKey={blockAccessKey}
        ownLocation={CellDescriptor.right}
      />
      <IonChip className={styles.chip}>)</IonChip>
    </>
  );
};

export default UnaryOperatorStrategy;
