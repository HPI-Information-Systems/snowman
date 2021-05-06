import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionUnaryOperatorOperatorEnum,
} from 'api';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/components/StrategyMapper/UndefinedStrategy';
import React, { useState } from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

const UnaryOperatorStrategy = (): JSX.Element => {
  const [operator, setOperator] = useState(
    SimilarityThresholdFunctionUnaryOperatorOperatorEnum.Acos as string
  );
  const [childType, setChildType] = useState(UndefinedStrategy);
  return (
    <>
      <IonChip>
        <IonSelect
          value={operator}
          onIonChange={(event: IonChangeEvent): void =>
            setOperator(event.detail.value as string)
          }
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
      </IonChip>
      <StrategyMapper
        nextStrategyType={
          childType as SimilarityThresholdFunctionDefinitionTypeEnum
        }
        setNextStrategyType={setChildType}
      />
      )
    </>
  );
};

export default UnaryOperatorStrategy;
