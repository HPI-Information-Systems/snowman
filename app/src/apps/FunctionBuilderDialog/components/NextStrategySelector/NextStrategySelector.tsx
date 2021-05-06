import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import { NextStrategySelectorProps } from 'apps/FunctionBuilderDialog/components/NextStrategySelector/NextStrategySelectorProps';
import React from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

const NextStrategySelector = ({
  nextStrategyType,
  setNextStrategyType,
}: NextStrategySelectorProps): JSX.Element => (
  <>
    <IonChip>
      <IonSelect
        value={nextStrategyType}
        onIonChange={(event: IonChangeEvent): void =>
          setNextStrategyType(event.detail.value as string)
        }
      >
        {Object.keys(SimilarityThresholdFunctionDefinitionTypeEnum).map(
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

export default NextStrategySelector;
