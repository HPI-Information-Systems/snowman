import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import { SimilarityThresholdFunctionOperatorOperatorEnum } from 'api';
import styles from 'apps/FunctionBuilderDialog/components/OperatorStrategy/OperatorStrategyStyles.module.css';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import React from 'react';
import { useSelector } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';

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
        <IonSelect
          placeholder="?"
          value={operator}
          onIonChange={(event: IonChangeEvent): void =>
            FunctionBuildingBlockMagistrate.setMidValue(
              blockAccessKey,
              event.detail
                .value as SimilarityThresholdFunctionOperatorOperatorEnum
            )
          }
        >
          {Object.values(SimilarityThresholdFunctionOperatorOperatorEnum).map(
            (anOperator: string): JSX.Element => (
              <IonSelectOption
                key={anOperator}
                value={
                  anOperator as SimilarityThresholdFunctionOperatorOperatorEnum
                }
              >
                {anOperator}
              </IonSelectOption>
            )
          )}
        </IonSelect>
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
