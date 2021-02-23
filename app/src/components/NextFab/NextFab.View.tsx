import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { NextFabProps } from 'components/NextFab/NextFabProps';
import { arrowForward } from 'ionicons/icons';
import React from 'react';

const NextFabView = ({
  clickOnFab,
  couldGoNext,
}: NextFabProps): JSX.Element => (
  <IonFab vertical="bottom" horizontal="end" edge={false} slot="fixed">
    <IonFabButton onClick={clickOnFab} disabled={!couldGoNext}>
      <IonIcon icon={arrowForward} />
    </IonFabButton>
  </IonFab>
);

export default NextFabView;
