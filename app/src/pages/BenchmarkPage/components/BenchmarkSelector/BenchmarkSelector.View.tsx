import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react';
import { Algorithm, Dataset, Experiment } from 'api';
import {
  addOutline,
  caretDown,
  caretForward,
  checkmarkCircle,
  radioButtonOffOutline,
} from 'ionicons/icons';
import { BenchmarkSelectorProps } from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelectorProps';
import styles from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelectorStyles.module.css';
import { ExpandedEntity } from 'pages/BenchmarkPage/types/ExpandedEntity';
import React from 'react';

const BenchmarkSelectorView = ({
  contentId,
  algorithms,
  datasets,
  experiments,
  expandedAlgorithmsInDatasets,
  expandDataset,
  shrinkDataset,
  expandAlgorithmInDataset,
  shrinkAlgorithmInDataset,
  selectExperiment,
  selectDatasetChildren,
  selectAlgorithmInDatasetChildren,
  selectedExperiments,
  searchString,
  setSearchString,
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
          {datasets.map(
            (aDataset: Dataset): JSX.Element => {
              const expandedDatasetEntity = expandedAlgorithmsInDatasets.find(
                (entity: ExpandedEntity): boolean => entity.id === aDataset.id
              );
              return (
                <>
                  <IonItem key={`bconf_${aDataset.id}`}>
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
                    {aDataset.name}
                    <IonIcon
                      icon={addOutline}
                      color={'medium'}
                      onClick={(): void => selectDatasetChildren(aDataset.id)}
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
                              <>
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
                                  {anAlgorithm.name}
                                  <IonIcon
                                    icon={addOutline}
                                    onClick={(): void =>
                                      selectAlgorithmInDatasetChildren(
                                        aDataset.id,
                                        anAlgorithm.id
                                      )
                                    }
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
                                          <>
                                            <IonItem>
                                              {anExperiment.name}
                                              <IonIcon
                                                icon={
                                                  selectedExperiments.includes(
                                                    anExperiment.id
                                                  )
                                                    ? checkmarkCircle
                                                    : radioButtonOffOutline
                                                }
                                                color={
                                                  selectedExperiments.includes(
                                                    anExperiment.id
                                                  )
                                                    ? 'primary'
                                                    : 'medium'
                                                }
                                                onClick={(): void =>
                                                  selectExperiment(
                                                    anExperiment.id
                                                  )
                                                }
                                                class={styles.selector}
                                                slot="end"
                                              />
                                            </IonItem>
                                          </>
                                        )
                                      )}
                                  </IonList>
                                ) : null}
                              </>
                            );
                          }
                        )}
                    </IonList>
                  ) : null}
                </>
              );
            }
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default BenchmarkSelectorView;
