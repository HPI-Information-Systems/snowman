import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionUnaryOperatorOperatorEnum,
} from 'api';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import styles from 'apps/FunctionBuilderDialog/components/UnaryOperatorStrategy/UnaryOperatorStrategyStyles.module.css';
import { FunctionBuildingBlockType } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import React, { useState } from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

const UnaryOperatorStrategy = (): JSX.Element => {
  const [operator, setOperator] = useState(
    SimilarityThresholdFunctionUnaryOperatorOperatorEnum.Acos as string
  );
  const [childType, setChildType] = useState<FunctionBuildingBlockType>(
    UndefinedStrategy
  );
  return (
    <>
      <IonChip className={styles.chip}>
        <IonSelect
          value={operator}
          onIonChange={(event: IonChangeEvent): void =>
            setOperator(event.detail.value as string)
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
        nextStrategyType={
          childType as SimilarityThresholdFunctionDefinitionTypeEnum
        }
        setNextStrategyType={setChildType}
      />
      <IonChip className={styles.chip}>)</IonChip>
    </>
  );
};

export default UnaryOperatorStrategy;
