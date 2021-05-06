import { IonChip, IonInput } from '@ionic/react';
import styles from 'apps/FunctionBuilderDialog/components/ConstantStrategy/ConstantStrategyStyles.module.css';
import React, { useState } from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';

const ConstantStrategy = (): JSX.Element => {
  const [constVal, setConstVal] = useState<number | undefined>(0);
  return (
    <IonChip outline>
      <IonInput
        className={styles.input}
        value={constVal}
        type="number"
        onIonChange={(event: IonChangeEvent): void =>
          setConstVal(parseInputToNumberOrUndef(event.detail.value))
        }
      />
    </IonChip>
  );
};

export default ConstantStrategy;
