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
import {
  caretDown,
  caretForward,
  checkmarkCircle,
  radioButtonOffOutline,
} from 'ionicons/icons';
import {
  BenchmarkAlgorithmConfig,
  BenchmarkDatasetConfig,
  BenchmarkExperimentConfig,
  BenchmarkSelectorProps,
} from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelectorProps';
import styles from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelectorStyles.module.css';
import React from 'react';

const BenchmarkSelectorView = ({
  contentId,
  config,
  expandDataset,
  expandAlgorithm,
  selectExperiment,
  selectDataset,
  selectAlgorithm,
}: BenchmarkSelectorProps): JSX.Element => {
  return (
    <IonMenu contentId={contentId}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonSearchbar placeholder="Search experiments" />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {config.algorithms.map(
            (anAlgorithm: BenchmarkAlgorithmConfig): JSX.Element => (
              <>
                <IonItem key={`bconf_${anAlgorithm.entity.id}`}>
                  <IonIcon
                    icon={anAlgorithm.isExpanded ? caretDown : caretForward}
                    onClick={(): void => expandAlgorithm(anAlgorithm.entity.id)}
                    color="medium"
                    slot="start"
                    class={styles.chevron}
                  />
                  {anAlgorithm.entity.name}
                  <IonIcon
                    icon={
                      anAlgorithm.isSelected
                        ? checkmarkCircle
                        : radioButtonOffOutline
                    }
                    color={anAlgorithm.isSelected ? 'primary' : 'medium'}
                    onClick={(): void => selectAlgorithm(anAlgorithm.entity.id)}
                    class={styles.selector}
                    slot="end"
                  />
                </IonItem>
                {anAlgorithm.isExpanded ? (
                  <IonList class={styles.listInset}>
                    {anAlgorithm.datasets.map(
                      (aDataset: BenchmarkDatasetConfig): JSX.Element => (
                        <>
                          <IonItem>
                            <IonIcon
                              icon={
                                aDataset.isExpanded ? caretDown : caretForward
                              }
                              onClick={(): void =>
                                expandDataset(aDataset.entity.id)
                              }
                              color="medium"
                              slot="start"
                              class={styles.chevron}
                            />
                            {aDataset.entity.name}
                            <IonIcon
                              icon={
                                aDataset.isSelected
                                  ? checkmarkCircle
                                  : radioButtonOffOutline
                              }
                              onClick={(): void =>
                                selectDataset(aDataset.entity.id)
                              }
                              color={aDataset.isSelected ? 'primary' : 'medium'}
                              class={styles.selector}
                              slot="end"
                            />
                          </IonItem>
                          {aDataset.isExpanded ? (
                            <IonList class={styles.listInsetMax}>
                              {aDataset.experiments.map(
                                (
                                  anExperiment: BenchmarkExperimentConfig
                                ): JSX.Element => (
                                  <>
                                    <IonItem>
                                      {anExperiment.entity.name}
                                      <IonIcon
                                        icon={
                                          anExperiment.isSelected
                                            ? checkmarkCircle
                                            : radioButtonOffOutline
                                        }
                                        color={
                                          anExperiment.isSelected
                                            ? 'primary'
                                            : 'medium'
                                        }
                                        onClick={(): void =>
                                          selectExperiment(
                                            anExperiment.entity.id
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
                      )
                    )}
                  </IonList>
                ) : null}
              </>
            )
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default BenchmarkSelectorView;
