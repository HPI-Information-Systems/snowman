import { IonIcon } from '@ionic/react';
import { StrategyUnselectorProps } from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselectorProps';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import { closeCircle } from 'ionicons/icons';
import React from 'react';

const StrategyUnselector = ({
  nextStrategyType,
  setNextStrategyType,
}: StrategyUnselectorProps): JSX.Element => (
  <>
    {nextStrategyType !== UndefinedStrategy ? (
      <IonIcon
        icon={closeCircle}
        onClick={(): void => setNextStrategyType(UndefinedStrategy)}
      />
    ) : null}
  </>
);

export default StrategyUnselector;
