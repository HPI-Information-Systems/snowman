import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { GenericFabProps } from 'components/simple/GenericFab/GenericFabProps';
import { add } from 'ionicons/icons';
import React from 'react';

const AddFab = ({ clickOnFab }: GenericFabProps): JSX.Element => (
  <IonFab
    vertical="bottom"
    horizontal="start"
    edge={false}
    slot="fixed"
    className={'doNotPrint'}
  >
    <IonFabButton onClick={clickOnFab}>
      <IonIcon icon={add} />
    </IonFabButton>
  </IonFab>
);

export default AddFab;
