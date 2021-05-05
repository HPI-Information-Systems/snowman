import {
  IonButton,
  IonChip,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionUnaryOperatorOperatorEnum,
} from 'api';
import ConstantStrategy from 'apps/FunctionBuilderDialog/components/ConstantStrategy/ConstantStrategy';
import OperatorStrategy from 'apps/FunctionBuilderDialog/components/OperatorStrategy/OperatorStrategy';
import SimilarityThresholdStrategy from 'apps/FunctionBuilderDialog/components/SimilarityThresholdStrategy/SimilarityThresholdStrategy';
import { UnaryOperatorStrategyProps } from 'apps/FunctionBuilderDialog/components/UnaryOperatorStrategy/UnaryOperatorStrategyProps';
import { closeCircle } from 'ionicons/icons';
import React, { useState } from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

const UnaryOperatorStrategy = ({
  children,
}: UnaryOperatorStrategyProps): JSX.Element => {
  const [operator, setOperator] = useState(
    SimilarityThresholdFunctionUnaryOperatorOperatorEnum.Acos as string
  );
  const [childType, setChildType] = useState('');
  return (
    <>
      <IonChip>
        <IonSelect
          value={operator}
          onIonChange={(event: IonChangeEvent): void =>
            setOperator(event.detail.value as string)
          }
        >
          {Object.keys(
            SimilarityThresholdFunctionUnaryOperatorOperatorEnum
          ).map(
            (anOperator: string): JSX.Element => (
              <IonSelectOption value={anOperator} key={anOperator}>
                {anOperator}
              </IonSelectOption>
            )
          )}
        </IonSelect>
      </IonChip>
      (
      {childType !== '' ? (
        ((): JSX.Element => {
          switch (childType) {
            case SimilarityThresholdFunctionDefinitionTypeEnum.Operator:
              return <OperatorStrategy />;
            case SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold:
              return <SimilarityThresholdStrategy />;
            case SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator:
              return <UnaryOperatorStrategy />;
            default:
              return <ConstantStrategy />;
          }
        })()
      ) : (
        <IonChip>
          <IonSelect
            value={childType}
            onIonChange={(event: IonChangeEvent): void =>
              setChildType(event.detail.value as string)
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
      )}
      <IonIcon icon={closeCircle} onClick={(): void => setChildType('')} />)
    </>
  );
};

export default UnaryOperatorStrategy;
