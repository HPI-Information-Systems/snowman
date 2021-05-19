import { IonText } from '@ionic/react';
import React from 'react';

export const EmptyPlaceholder = (): JSX.Element => (
  <IonText color="clear" style={{ opacity: 0.5 }}>
    {'<None>'}
  </IonText>
);
