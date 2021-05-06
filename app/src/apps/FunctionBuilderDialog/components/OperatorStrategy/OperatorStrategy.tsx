import { IonChip } from '@ionic/react';
import { SimilarityThresholdFunctionOperatorOperatorEnum } from 'api';
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
      (<IonChip>LEFT</IonChip>
      <IonChip>OP</IonChip>
      <IonChip>RIGHT</IonChip>)
    </>
  );
};

export default OperatorStrategy;
