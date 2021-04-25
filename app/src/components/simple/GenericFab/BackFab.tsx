import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { GenericFabProps } from 'components/simple/GenericFab/GenericFabProps';
import { arrowBack } from 'ionicons/icons';
import React from 'react';

const BackFab = ({ clickOnFab }: GenericFabProps): JSX.Element => (
  <IonFab vertical="bottom" horizontal="start" edge={false} slot="fixed">
    <IonFabButton onClick={clickOnFab}>
      <IonIcon icon={arrowBack} />
    </IonFabButton>
  </IonFab>
);

export default BackFab;
