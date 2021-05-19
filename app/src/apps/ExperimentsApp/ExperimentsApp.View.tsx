import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonRow,
  IonText,
} from '@ionic/react';
import { Experiment } from 'api';
import ExperimentCard from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCard';
import { ExperimentsAppProps } from 'apps/ExperimentsApp/ExperimentsAppProps';
import AddFab from 'components/simple/GenericFab/AddFab';
import AlgorithmSelectableInput from 'components/stateful/SelectableInputFactory/flavors/AlgorithmSelectableInput';
import DatasetSelectableInput from 'components/stateful/SelectableInputFactory/flavors/DatasetSelectableInput';
import { filter } from 'ionicons/icons';
import React from 'react';

const ExperimentsAppView = ({
  selectedAlgorithms,
  resources,
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
              <IonIcon icon={filter} slot="start" size="small" />
              <DatasetSelectableInput
                selection={selectedDatasets}
                onChange={changeSelectedDatasets}
                allOptions={resources.datasets}
                allowMultiselect={false}
              />
            </IonItem>
          </IonCol>
          <IonCol size="12" sizeLg="6">
            <IonItem>
              <IonIcon icon={filter} slot="start" size="small" />
              <AlgorithmSelectableInput
                selection={selectedAlgorithms}
                onChange={changeSelectedAlgorithms}
                allOptions={resources.algorithms}
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
                algorithmName={
                  resources.algorithmsMap[anExperiment.algorithmId]?.name
                }
                datasetName={
                  resources.datasetsMap[anExperiment.datasetId]?.name
                }
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
