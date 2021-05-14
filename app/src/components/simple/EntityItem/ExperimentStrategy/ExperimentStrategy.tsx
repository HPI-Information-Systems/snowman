import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { Experiment } from 'api';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import { flask } from 'ionicons/icons';
import React from 'react';
import { getAlgorithmNameFromId } from 'utils/algorithmHelpers';
import { getDatasetNameFromId } from 'utils/datasetHelper';
import useTooltip from 'utils/useTooltipHook';

const ExperimentStrategy = ({ item }: EntityItemProps): JSX.Element => {
  useTooltip();
  return (
    <IonItem
      data-tip={`Dataset: ${getDatasetNameFromId(
        (item as Experiment).id,
        SnowmanAppMagistrate.getStore().getState().CentralResourcesStore
          .datasets
      )} Matching Solution: ${getAlgorithmNameFromId(
        (item as Experiment).id,
        SnowmanAppMagistrate.getStore().getState().CentralResourcesStore
          .algorithms
      )}`}
    >
      <IonIcon icon={flask} />
      <IonLabel>{(item as Experiment).name}</IonLabel>
    </IonItem>
  );
};

export default ExperimentStrategy;
