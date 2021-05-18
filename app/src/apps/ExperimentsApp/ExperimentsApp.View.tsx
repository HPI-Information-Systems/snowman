import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react';
import { Experiment } from 'api';
import ExperimentCard from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCard';
import { ExperimentsAppProps } from 'apps/ExperimentsApp/ExperimentsAppProps';
import styles from 'apps/ExperimentsApp/ExperimentsAppStyles.module.css';
import AddFab from 'components/simple/GenericFab/AddFab';
import AlgorithmSelectableInput from 'components/stateful/SelectableInputFactory/flavors/AlgorithmSelectableInput';
import DatasetSelectableInput from 'components/stateful/SelectableInputFactory/flavors/DatasetSelectableInput';
import React from 'react';
import { getAlgorithmNameFromId } from 'utils/algorithmHelpers';
import { getDatasetNameFromId } from 'utils/datasetHelper';

const ExperimentsAppView = ({
  algorithms,
  selectedAlgorithms,
  datasets,
  selectedDatasets,
  currentExperiments,
  changeSelectedDatasets,
  changeSelectedAlgorithms,
  addExperiment,
}: ExperimentsAppProps): JSX.Element => {
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeLg="6">
            <IonItem>
              <IonLabel position="fixed" className={styles.filterLabel}>
                Filter by <br /> Dataset
              </IonLabel>
              <DatasetSelectableInput
                selection={selectedDatasets}
                onChange={changeSelectedDatasets}
                allOptions={datasets}
                allowMultiselect={false}
              />
            </IonItem>
          </IonCol>
          <IonCol size="12" sizeLg="6">
            <IonItem>
              <IonLabel position="fixed" className={styles.filterLabel}>
                Filter by <br /> Matching <br />
                Solution
              </IonLabel>
              <AlgorithmSelectableInput
                selection={selectedAlgorithms}
                onChange={changeSelectedAlgorithms}
                allOptions={algorithms}
                allowMultiselect={false}
              />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonText color="primary">
        <h3>Experiments</h3>
      </IonText>
      <IonGrid>
        <IonRow>
          {currentExperiments.map((anExperiment: Experiment) => (
            <IonCol key={'col' + anExperiment.id} size="4" sizeXl="3">
              <ExperimentCard
                key={`experimentCard-${anExperiment.id}`}
                experiment={anExperiment}
                algorithmName={getAlgorithmNameFromId(
                  anExperiment.algorithmId,
                  algorithms
                )}
                datasetName={getDatasetNameFromId(
                  anExperiment.datasetId,
                  datasets
                )}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      {currentExperiments.length === 0 ? (
        <IonText color="medium">No experiments found!</IonText>
      ) : undefined}
      <AddFab clickOnFab={addExperiment} />
    </>
  );
};

export default ExperimentsAppView;
