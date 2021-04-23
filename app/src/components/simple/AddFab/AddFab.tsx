import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { AddFabProps } from 'components/simple/AddFab/AddFabProps';
import { add } from 'ionicons/icons';
import React from 'react';

const AddFab = ({ clickOnFab }: AddFabProps): JSX.Element => (
  <IonFab vertical="bottom" horizontal="start" edge={false} slot="fixed">
    <IonFabButton onClick={clickOnFab}>
      <IonIcon icon={add} />
    </IonFabButton>
  </IonFab>
);

export default AddFab;
