import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { Experiment } from 'api';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import { flask } from 'ionicons/icons';
import React from 'react';

const ExperimentStrategy = ({ item }: EntityItemProps): JSX.Element => (
  <IonItem>
    <IonIcon icon={flask} />
    <IonLabel>{(item as Experiment).name}</IonLabel>
  </IonItem>
);

export default ExperimentStrategy;
