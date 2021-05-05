import { IonChip, IonInput } from '@ionic/react';
import React, { useState } from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';

const ConstantStrategy = (): JSX.Element => {
  const [constVal, setConstVal] = useState<number | undefined>(0);
  return (
    <IonChip>
      <IonInput
        value={constVal}
        onIonChange={(event: IonChangeEvent): void =>
          setConstVal(parseInputToNumberOrUndef(event.detail.value))
        }
      />
    </IonChip>
  );
};

export default ConstantStrategy;
