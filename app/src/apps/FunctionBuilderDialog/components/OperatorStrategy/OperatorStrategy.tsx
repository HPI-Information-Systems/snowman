import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionOperatorOperatorEnum,
} from 'api';
import styles from 'apps/FunctionBuilderDialog/components/OperatorStrategy/OperatorStrategyStyles.module.css';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import {
  FunctionBuildingBlock,
  FunctionBuildingBlockType,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import React, { useState } from 'react';

const OperatorStrategy = (): JSX.Element => {
  const [operator, setOperator] = useState(
    SimilarityThresholdFunctionOperatorOperatorEnum.Add as string
  );
  const [leftChildType, setLeftChildType] = useState<FunctionBuildingBlockType>(
    UndefinedStrategy
  );
  const [
    rightChildType,
    setRightChildType,
  ] = useState<FunctionBuildingBlockType>(UndefinedStrategy);
  return (
    <>
      <IonChip className={styles.chip}>(</IonChip>
      <div className={styles.container}>
        <StrategyMapper
          nextStrategyType={leftChildType as FunctionBuildingBlockType}
          setNextStrategyType={setLeftChildType}
        />
      </div>
      <IonChip className={styles.chip}>
        <IonSelect placeholder="?">
          {Object.keys(SimilarityThresholdFunctionOperatorOperatorEnum).map(
            (anOperator: string): JSX.Element => (
              <IonSelectOption key={anOperator}>{anOperator}</IonSelectOption>
            )
          )}
        </IonSelect>
      </IonChip>
      <div className={styles.container}>
        <StrategyMapper
          nextStrategyType={
            rightChildType as SimilarityThresholdFunctionDefinitionTypeEnum
          }
          setNextStrategyType={setRightChildType}
        />
      </div>
      <IonChip className={styles.chip}>)</IonChip>
    </>
  );
};

export default OperatorStrategy;
