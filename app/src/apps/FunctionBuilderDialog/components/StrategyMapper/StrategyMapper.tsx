import NextStrategySelector from 'apps/FunctionBuilderDialog/components/NextStrategySelector/NextStrategySelector';
import {
  StrategyMap,
  StrategyMapItem,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import { StrategyMapperProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import StrategyUnselector from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselector';
import React, { createElement } from 'react';

const StrategyMapper = ({
  nextStrategyType,
  setNextStrategyType,
}: StrategyMapperProps): JSX.Element => (
  <>
    {((): JSX.Element => {
      const targetStrategy = StrategyMap.find(
        (aStrategyMapItem: StrategyMapItem): boolean =>
          aStrategyMapItem.targetStrategyKey === nextStrategyType
      )?.targetStrategyComponent;
      return targetStrategy !== undefined ? (
        <>
          {createElement(targetStrategy)}
          <StrategyUnselector
            nextStrategyType={nextStrategyType}
            setNextStrategyType={setNextStrategyType}
          />
        </>
      ) : (
        <NextStrategySelector
          nextStrategyType={nextStrategyType}
          setNextStrategyType={setNextStrategyType}
        />
      );
    })()}
  </>
);

export default StrategyMapper;
