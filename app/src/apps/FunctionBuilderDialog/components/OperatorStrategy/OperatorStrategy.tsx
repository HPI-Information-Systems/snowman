import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionOperatorOperatorEnum,
} from 'api';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/components/StrategyMapper/UndefinedStrategy';
import React, { useState } from 'react';

const OperatorStrategy = (): JSX.Element => {
  const [operator, setOperator] = useState(
    SimilarityThresholdFunctionOperatorOperatorEnum.Add as string
  );
  const [leftChildType, setLeftChildType] = useState(UndefinedStrategy);
  const [rightChildType, setRightChildType] = useState(UndefinedStrategy);
  return (
    <>
      (
      <StrategyMapper
        nextStrategyType={
          leftChildType as SimilarityThresholdFunctionDefinitionTypeEnum
        }
        setNextStrategyType={setLeftChildType}
      />
      <IonChip>
        <IonSelect>
          {Object.keys(SimilarityThresholdFunctionOperatorOperatorEnum).map(
            (anOperator: string): JSX.Element => (
              <IonSelectOption key={anOperator}>{anOperator}</IonSelectOption>
            )
          )}
        </IonSelect>
      </IonChip>
      <StrategyMapper
        nextStrategyType={
          rightChildType as SimilarityThresholdFunctionDefinitionTypeEnum
        }
        setNextStrategyType={setRightChildType}
      />
      )
    </>
  );
};

export default OperatorStrategy;
