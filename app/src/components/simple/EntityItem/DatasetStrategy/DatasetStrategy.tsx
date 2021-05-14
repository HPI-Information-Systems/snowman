import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { Dataset } from 'api';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import { fileTrayFull } from 'ionicons/icons';
import React from 'react';

const DatasetStrategy = ({ item }: EntityItemProps): JSX.Element => (
  <IonItem>
    <IonIcon icon={fileTrayFull} />
    <IonLabel>{(item as Dataset).name}</IonLabel>
  </IonItem>
);

export default DatasetStrategy;
