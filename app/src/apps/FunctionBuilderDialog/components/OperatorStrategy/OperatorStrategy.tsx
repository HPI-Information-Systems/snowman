import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionOperatorOperatorEnum,
} from 'api';
import NextStrategySelector from 'apps/FunctionBuilderDialog/components/NextStrategySelector/NextStrategySelector';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/components/StrategyMapper/UndefinedStrategy';
import StrategyUnselector from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselector';
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
        targetStrategyType={
          leftChildType as SimilarityThresholdFunctionDefinitionTypeEnum
        }
      >
        <NextStrategySelector
          nextStrategy={leftChildType}
          setNextStrategy={setLeftChildType}
        />
      </StrategyMapper>
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
        targetStrategyType={
          rightChildType as SimilarityThresholdFunctionDefinitionTypeEnum
        }
      >
        <NextStrategySelector
          nextStrategy={rightChildType}
          setNextStrategy={setRightChildType}
        />
      </StrategyMapper>
      <StrategyUnselector
        strategyType={rightChildType}
        setStrategyType={setRightChildType}
      />
      )
    </>
  );
};

export default OperatorStrategy;
