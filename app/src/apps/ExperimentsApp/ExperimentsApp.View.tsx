import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import { Algorithm, Dataset, Experiment } from 'api';
import ExperimentCard from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCard';
import { ExperimentsAppProps } from 'apps/ExperimentsApp/ExperimentsAppProps';
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
}: ExperimentsAppProps): JSX.Element => {
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Filter by datasets</IonLabel>
              <IonSelect
                value={selectedDatasets}
                placeholder="Select multiple"
                onIonChange={changeSelectedDatasets}
                multiple={true}
              >
                {datasets.map(
                  (aDataset: Dataset): JSX.Element => (
                    <IonSelectOption
                      key={`filter_datasets_${aDataset.id}`}
                      value={aDataset.id.toString()}
                    >
                      {aDataset.name}
                    </IonSelectOption>
                  )
                )}
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Filter by matching solutions</IonLabel>
              <IonSelect
                value={selectedAlgorithms}
                placeholder="Select multiple"
                onIonChange={changeSelectedAlgorithms}
                multiple={true}
              >
                {algorithms.map(
                  (anAlgorithm: Algorithm): JSX.Element => (
                    <IonSelectOption
                      key={`filter_algorithms_${anAlgorithm.id}`}
                      value={anAlgorithm.id.toString()}
                    >
                      {anAlgorithm.name}
                    </IonSelectOption>
                  )
                )}
              </IonSelect>
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
    </>
  );
};

export default ExperimentsAppView;
