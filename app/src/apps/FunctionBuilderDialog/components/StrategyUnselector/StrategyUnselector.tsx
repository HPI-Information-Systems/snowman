import { IonIcon } from '@ionic/react';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/components/StrategyMapper/UndefinedStrategy';
import { StrategyUnselectorProps } from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselectorProps';
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
