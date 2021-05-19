import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import { StrategyDisplayNames } from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategyDisplayNames';
import { StrategySelectorProps } from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategySelectorProps';
import { FunctionBuildingBlockType } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import React from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

const StrategySelectorView = ({
  chosenStrategyType,
  setStrategyType,
}: StrategySelectorProps): JSX.Element => (
  <>
    <IonChip color="danger">
      <IonSelect
        value={chosenStrategyType}
        onIonChange={(event: IonChangeEvent): void =>
          setStrategyType(event.detail.value as FunctionBuildingBlockType)
        }
        placeholder="?"
      >
        {Object.keys(SimilarityThresholdFunctionDefinitionTypeEnum)
          .sort()
          // Rename enum values
          .map((aValue) => StrategyDisplayNames[aValue])
          .map(
            (anOperatorType: string): JSX.Element => (
              <IonSelectOption value={anOperatorType} key={anOperatorType}>
                {anOperatorType}
              </IonSelectOption>
            )
          )}
      </IonSelect>
    </IonChip>
  </>
);

export default StrategySelectorView;
