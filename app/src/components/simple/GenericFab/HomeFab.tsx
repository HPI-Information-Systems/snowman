import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { GenericFabProps } from 'components/simple/GenericFab/GenericFabProps';
import { gridOutline } from 'ionicons/icons';
import React from 'react';

const HomeFab = ({ clickOnFab }: GenericFabProps): JSX.Element => (
  <IonFab
    vertical="bottom"
    horizontal="start"
    edge={false}
    slot="fixed"
    className={'doNotPrint'}
  >
    <IonFabButton onClick={clickOnFab}>
      <IonIcon icon={gridOutline} />
    </IonFabButton>
  </IonFab>
);

export default HomeFab;
