import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
} from '@ionic/react';
import { DatasetSelectorItemProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroupProps';
import SelectorPopoverGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup';
import styles from 'components/stateful/SelectableInput/SelectableInputStyles.module.css';
import {
  fileTrayFull,
  radioButtonOffOutline,
  radioButtonOnOutline,
} from 'ionicons/icons';
import React from 'react';
import { fuzzyStringIncludes } from 'utils/fuzzyStringIncludes';

const DatasetSelectorItemView = ({
  selectedDataset,
  datasets,
  cacheKey,
  setDatasetId,
}: DatasetSelectorItemProps): JSX.Element => (
  <SelectorPopoverGroup
    instanceDescriptor={cacheKey}
    items={[{ icon: fileTrayFull, title: selectedDataset?.name ?? '' }]}
  >
    {(close) => (
      <IonList inset={false} lines="none">
        <IonSearchbar
          value={''}
          onIonChange={() => {
            return;
          }}
        />
        <div className={styles.selectablePopoverList}>
          {datasets.map((dataset) =>
            fuzzyStringIncludes(dataset.name, '') ? (
              <IonItem
                button
                key={`selectable-option-${dataset.id}`}
                onClick={(): void => {
                  setDatasetId(dataset.id);
                  close();
                }}
              >
                <IonIcon
                  icon={
                    dataset.id === selectedDataset?.id
                      ? radioButtonOnOutline
                      : radioButtonOffOutline
                  }
                  color={
                    dataset.id === selectedDataset?.id ? 'primary' : 'medium'
                  }
                  slot="start"
                />
                <IonLabel>{dataset.name}</IonLabel>
              </IonItem>
            ) : null
          )}
        </div>
      </IonList>
    )}
  </SelectorPopoverGroup>
);

export default DatasetSelectorItemView;
