import { IonButton, IonChip, IonItemDivider } from '@ionic/react';
import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import ConstantStrategy from 'apps/FunctionBuilderDialog/components/ConstantStrategy/ConstantStrategy';
import OperatorStrategy from 'apps/FunctionBuilderDialog/components/OperatorStrategy/OperatorStrategy';
import SimilarityThresholdStrategy from 'apps/FunctionBuilderDialog/components/SimilarityThresholdStrategy/SimilarityThresholdStrategy';
import UnaryOperatorStrategy from 'apps/FunctionBuilderDialog/components/UnaryOperatorStrategy/UnaryOperatorStrategy';
import { FunctionBuilderDialogProps } from 'apps/FunctionBuilderDialog/FunctionBuilderDialogProps';
import React from 'react';

const FunctionBuilderDialogView = ({
  clickOnCancel,
  operator,
  clickOnAddOrUpdate,
  isAddDialog,
  selectRootType,
}: FunctionBuilderDialogProps): JSX.Element => (
  <>
    <OperatorStrategy />
    <SimilarityThresholdStrategy />
    <ConstantStrategy />
    <UnaryOperatorStrategy />
    <IonItemDivider />
    {Object.keys(SimilarityThresholdFunctionDefinitionTypeEnum).map(
      (aType: string): JSX.Element => (
        <IonChip
          key={aType}
          color={operator.type === aType ? 'primary' : undefined}
          onClick={(): void =>
            selectRootType(
              aType as SimilarityThresholdFunctionDefinitionTypeEnum
            )
          }
        >
          {aType}
        </IonChip>
      )
    )}
    <IonItemDivider />
    <IonButton onClick={clickOnCancel}>Cancel</IonButton>
    <IonButton onClick={clickOnAddOrUpdate}>
      {isAddDialog ? 'Add' : 'Update'}
    </IonButton>
  </>
);

export default FunctionBuilderDialogView;
