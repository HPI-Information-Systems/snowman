import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { Dataset } from 'api';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import { fileTrayFull } from 'ionicons/icons';
import React from 'react';
import useTooltip from 'utils/useTooltipHook';

const DatasetStrategy = ({ item }: EntityItemProps): JSX.Element => {
  useTooltip();
  return (
    <IonItem>
      <IonIcon icon={fileTrayFull} />
      <IonLabel>{(item as Dataset).name}</IonLabel>
    </IonItem>
  );
};

export default DatasetStrategy;
