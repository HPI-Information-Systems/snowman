import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import { SimilarityThresholdFunctionUnaryOperatorOperatorEnum } from 'api';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import styles from 'apps/FunctionBuilderDialog/components/UnaryOperatorStrategy/UnaryOperatorStrategyStyles.module.css';
import {
  CellDescriptor,
  FunctionBuildingBlockType,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import React, { useState } from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

const UnaryOperatorStrategy = ({
  blockAccessKey,
}: StrategyMapperForwardProps): JSX.Element => {
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
        parentAccessKey={blockAccessKey}
        ownLocation={CellDescriptor.right}
      />
      <IonChip className={styles.chip}>)</IonChip>
    </>
  );
};

export default UnaryOperatorStrategy;
