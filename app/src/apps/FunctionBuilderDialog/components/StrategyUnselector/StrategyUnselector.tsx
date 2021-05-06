import { IonIcon } from '@ionic/react';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/components/StrategyMapper/UndefinedStrategy';
import { StrategyUnselectorProps } from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselectorProps';
import { closeCircle } from 'ionicons/icons';
import React from 'react';

const StrategyUnselector = ({
  strategyType,
  setStrategyType,
}: StrategyUnselectorProps): JSX.Element => (
  <>
    {strategyType !== UndefinedStrategy ? (
      <IonIcon
        icon={closeCircle}
        onClick={(): void => setStrategyType(UndefinedStrategy)}
      />
    ) : null}
  </>
);

export default StrategyUnselector;
