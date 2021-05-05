import { IonButton, IonChip, IonItemDivider } from '@ionic/react';
import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
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
    <StrategyMapper targetStrategyType={operator.type} />
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
