import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionOperatorOperatorEnum,
} from 'api';
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
      (
      <StrategyMapper
        nextStrategyType={leftChildType as FunctionBuildingBlockType}
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
