import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonMenu,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react';
import { Algorithm, Dataset, Experiment } from 'api';
import { BenchmarkSelectorProps } from 'apps/BenchmarkApp/components/BenchmarkSelector/BenchmarkSelectorProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkSelector/BenchmarkSelectorStyles.module.css';
import { ExpandedEntity } from 'apps/BenchmarkApp/types/ExpandedEntity';
import {
  addOutline,
  caretDown,
  caretForward,
  checkmarkCircle,
  documentTextOutline,
  fileTrayFull,
  flask,
  radioButtonOffOutline,
} from 'ionicons/icons';
import React from 'react';

const BenchmarkSelectorView = ({
  contentId,
  algorithms,
  datasets,
  experiments,
  expandedAlgorithmsInDatasets,
  expandDataset,
  expandDatasetFull,
  shrinkDataset,
  expandAlgorithmInDataset,
  shrinkAlgorithmInDataset,
  selectExperiment,
  selectDatasetChildren,
  selectAlgorithmInDatasetChildren,
  selectedExperimentIds,
  searchString,
  setSearchString,
  selectNone,
}: BenchmarkSelectorProps): JSX.Element => {
  return (
    <IonMenu contentId={contentId}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonSearchbar
            placeholder="Search experiments"
            value={searchString}
            onIonChange={setSearchString}
            debounce={1000}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <span style={{ cursor: 'pointer' }} onClick={selectNone}>
              Clear selection
            </span>
          </IonListHeader>
          {datasets.map(
            (aDataset: Dataset): JSX.Element => {
              const expandedDatasetEntity = expandedAlgorithmsInDatasets.find(
                (entity: ExpandedEntity): boolean => entity.id === aDataset.id
              );
              return (
                <React.Fragment key={`bconf_${aDataset.id}`}>
                  <IonItem>
                    <IonIcon
                      icon={
                        expandedDatasetEntity !== undefined
                          ? caretDown
                          : caretForward
                      }
                      onClick={(): void =>
                        expandedDatasetEntity !== undefined
                          ? shrinkDataset(aDataset.id)
                          : expandDataset(aDataset.id)
                      }
                      color="primarydark"
                      slot="start"
                      class={styles.chevron}
                    />
                    <IonIcon
                      icon={fileTrayFull}
                      className={styles.descriptiveIcon}
                      color="primarydark"
                    />
                    {aDataset.name}
                    <IonIcon
                      icon={addOutline}
                      color={'medium'}
                      onClick={(): void => {
                        expandDatasetFull(aDataset.id);
                        selectDatasetChildren(aDataset.id);
                      }}
                      class={styles.selector}
                      slot="end"
                    />
                  </IonItem>
                  {expandedDatasetEntity !== undefined ? (
                    <IonList class={styles.listInset}>
                      {algorithms
                        .filter(
                          (anAlgorithm: Algorithm): boolean =>
                            experiments.findIndex(
                              (anExperiment: Experiment): boolean =>
                                anExperiment.datasetId === aDataset.id &&
                                anExperiment.algorithmId === anAlgorithm.id
                            ) > -1
                        )
                        .map(
                          (anAlgorithm: Algorithm): JSX.Element => {
                            const isAlgorithmExpanded =
                              expandedDatasetEntity.children.find(
                                (entity: ExpandedEntity): boolean =>
                                  entity.id === anAlgorithm.id
                              ) !== undefined;
                            return (
                              <React.Fragment
                                key={`bconf_${aDataset.id}_${anAlgorithm.id}`}
                              >
                                <IonItem>
                                  <IonIcon
                                    icon={
                                      isAlgorithmExpanded
                                        ? caretDown
                                        : caretForward
                                    }
                                    onClick={(): void =>
                                      isAlgorithmExpanded
                                        ? shrinkAlgorithmInDataset(
                                            aDataset.id,
                                            anAlgorithm.id
                                          )
                                        : expandAlgorithmInDataset(
                                            aDataset.id,
                                            anAlgorithm.id
                                          )
                                    }
                                    color="primarydark"
                                    slot="start"
                                    class={styles.chevron}
                                  />
                                  <IonIcon
                                    icon={flask}
                                    className={styles.descriptiveIcon}
                                    color="primarydark"
                                  />
                                  {anAlgorithm.name}
                                  <IonIcon
                                    icon={addOutline}
                                    onClick={(): void => {
                                      expandAlgorithmInDataset(
                                        aDataset.id,
                                        anAlgorithm.id
                                      );
                                      selectAlgorithmInDatasetChildren(
                                        aDataset.id,
                                        anAlgorithm.id
                                      );
                                    }}
                                    color={'medium'}
                                    class={styles.selector}
                                    slot="end"
                                  />
                                </IonItem>
                                {isAlgorithmExpanded ? (
                                  <IonList class={styles.listInsetMax}>
                                    {experiments
                                      .filter(
                                        (anExperiment: Experiment): boolean =>
                                          anExperiment.datasetId ===
                                            aDataset.id &&
                                          anExperiment.algorithmId ===
                                            anAlgorithm.id
                                      )
                                      .map(
                                        (
                                          anExperiment: Experiment
                                        ): JSX.Element => (
                                          <IonItem
                                            key={`bconf_${anExperiment.id}`}
                                            onClick={(): void =>
                                              selectExperiment(anExperiment.id)
                                            }
                                          >
                                            <IonIcon
                                              icon={documentTextOutline}
                                              className={styles.descriptiveIcon}
                                              color="primarydark"
                                            />
                                            {anExperiment.name}
                                            <IonIcon
                                              icon={
                                                selectedExperimentIds.includes(
                                                  anExperiment.id
                                                )
                                                  ? checkmarkCircle
                                                  : radioButtonOffOutline
                                              }
                                              color={
                                                selectedExperimentIds.includes(
                                                  anExperiment.id
                                                )
                                                  ? 'primary'
                                                  : 'medium'
                                              }
                                              class={styles.selector}
                                              slot="end"
                                            />
                                          </IonItem>
                                        )
                                      )}
                                  </IonList>
                                ) : null}
                              </React.Fragment>
                            );
                          }
                        )}
                    </IonList>
                  ) : null}
                </React.Fragment>
              );
            }
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default BenchmarkSelectorView;
