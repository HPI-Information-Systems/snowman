import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import { SimilarityThresholdFunctionOperatorOperatorEnum } from 'api';
import styles from 'apps/FunctionBuilderDialog/components/OperatorStrategy/OperatorStrategyStyles.module.css';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import React from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

const OperatorStrategy = ({
  blockAccessKey,
}: StrategyMapperForwardProps): JSX.Element => (
  <>
    <IonChip className={styles.chip}>(</IonChip>
    <div className={styles.container}>
      <StrategyMapper
        parentAccessKey={blockAccessKey}
        ownLocation={CellDescriptor.left}
      />
    </div>
    <IonChip className={styles.chip}>
      <IonSelect
        placeholder="?"
        onIonChange={(event: IonChangeEvent): void =>
          FunctionBuildingBlockMagistrate.setMidValue(
            blockAccessKey,
            event.detail
              .value as SimilarityThresholdFunctionOperatorOperatorEnum
          )
        }
      >
        {Object.keys(SimilarityThresholdFunctionOperatorOperatorEnum).map(
          (anOperator: string): JSX.Element => (
            <IonSelectOption
              key={anOperator}
              value={
                anOperator as SimilarityThresholdFunctionOperatorOperatorEnum
              }
            >
              {anOperator}
            </IonSelectOption>
          )
        )}
      </IonSelect>
    </IonChip>
    <div className={styles.container}>
      <StrategyMapper
        parentAccessKey={blockAccessKey}
        ownLocation={CellDescriptor.right}
      />
    </div>
    <IonChip className={styles.chip}>)</IonChip>
  </>
);

export default OperatorStrategy;
