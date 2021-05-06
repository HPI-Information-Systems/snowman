import { IonButton, IonItemDivider } from '@ionic/react';
import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
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
    <StrategyMapper
      blockAccessKey={RootAccessKey}
      nextStrategyType={operator.type}
      setNextStrategyType={selectRootType}
    />
    <IonItemDivider />
    <IonButton onClick={clickOnCancel}>Cancel</IonButton>
    <IonButton onClick={clickOnAddOrUpdate}>
      {isAddDialog ? 'Add' : 'Update'}
    </IonButton>
  </>
);

export default FunctionBuilderDialogView;
