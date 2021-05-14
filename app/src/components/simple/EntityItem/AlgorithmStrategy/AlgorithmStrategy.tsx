import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { Algorithm } from 'api';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import { hardwareChip } from 'ionicons/icons';
import React from 'react';
import useTooltip from 'utils/useTooltipHook';

const AlgorithmStrategy = ({ item }: EntityItemProps): JSX.Element => {
  useTooltip();
  return (
    <IonItem>
      <IonIcon icon={hardwareChip} />
      <IonLabel>{(item as Algorithm).name}</IonLabel>
    </IonItem>
  );
};

export default AlgorithmStrategy;
