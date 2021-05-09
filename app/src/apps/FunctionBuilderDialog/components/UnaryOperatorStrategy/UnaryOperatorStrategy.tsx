import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import { SimilarityThresholdFunctionUnaryOperatorOperatorEnum } from 'api';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import styles from 'apps/FunctionBuilderDialog/components/UnaryOperatorStrategy/UnaryOperatorStrategyStyles.module.css';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import React from 'react';
import { useSelector } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';

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
        <IonSelect
          value={operator}
          onIonChange={(event: IonChangeEvent): void =>
            FunctionBuildingBlockMagistrate.setLeftValue(
              blockAccessKey,
              (event.detail.value as string) ?? null
            )
          }
          placeholder="?"
        >
          {Object.keys(
            SimilarityThresholdFunctionUnaryOperatorOperatorEnum
          ).map(
            (anOperator: string): JSX.Element => (
              <IonSelectOption value={anOperator} key={anOperator}>
                {anOperator}
              </IonSelectOption>
            )
          )}
        </IonSelect>
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
