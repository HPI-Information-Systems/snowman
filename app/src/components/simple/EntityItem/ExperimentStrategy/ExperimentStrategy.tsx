import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { Experiment } from 'api';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import styles from 'components/simple/EntityItem/EntityItemStyles.module.css';
import { flask, openOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { ViewIDs } from 'types/ViewIDs';
import { getAlgorithmNameFromId } from 'utils/algorithmHelpers';
import { getDatasetNameFromId } from 'utils/datasetHelper';
import useTooltip from 'utils/useTooltipHook';

const ExperimentStrategy = ({ item }: EntityItemProps): JSX.Element => {
  useTooltip();
  const [open, setOpen] = useState(true);
  return (
    <IonItem
      color="clear"
      className={styles.lessPaddingLeft}
      onMouseOver={() => setOpen(false)}
      onMouseOut={() => setOpen(true)}
      data-tip={`${item.description}

Dataset: ${getDatasetNameFromId(
        (item as Experiment).id,
        SnowmanAppMagistrate.getStore().getState().CentralResourcesStore
          .datasets
      )} Matching Solution: ${getAlgorithmNameFromId(
        (item as Experiment).id,
        SnowmanAppMagistrate.getStore().getState().CentralResourcesStore
          .algorithms
      )}`}
    >
      <IonButton
        onClick={(e) => {
          doOpenDialog(ViewIDs.ExperimentDialog, item.id);
          e.preventDefault();
          e.stopPropagation();
        }}
        className={styles.noPadding}
        fill="clear"
      >
        <IonIcon
          icon={open ? flask : openOutline}
          color="primarydark"
          size="small"
        />
      </IonButton>
      <IonLabel className={styles.paddingLeft}>
        {(item as Experiment).name}
      </IonLabel>
    </IonItem>
  );
};

export default ExperimentStrategy;
