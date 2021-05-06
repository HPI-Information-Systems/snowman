import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import { NextStrategySelectorProps } from 'apps/FunctionBuilderDialog/components/NextStrategySelector/NextStrategySelectorProps';
import React from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

const NextStrategySelector = ({
  nextStrategy,
  setNextStrategy,
}: NextStrategySelectorProps): JSX.Element => (
  <>
    <IonChip>
      <IonSelect
        value={nextStrategy}
        onIonChange={(event: IonChangeEvent): void =>
          setNextStrategy(event.detail.value as string)
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
