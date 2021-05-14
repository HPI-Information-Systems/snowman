import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import { Algorithm, Experiment } from 'api';
import ExperimentCard from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCard';
import { ExperimentsAppProps } from 'apps/ExperimentsApp/ExperimentsAppProps';
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
          <IonCol>
            <IonItem>
              <IonLabel>Filter by datasets</IonLabel>
              <DatasetSelectableInput
                selection={selectedDatasets}
                onChange={changeSelectedDatasets}
                allOptions={datasets}
                allowMultiselect={true}
              />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Filter by matching solutions</IonLabel>
              <AlgorithmSelectableInput
                selection={selectedAlgorithms}
                onChange={changeSelectedAlgorithms}
                allOptions={algorithms}
                allowMultiselect={true}
              />
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
      <AddFab clickOnFab={addExperiment} />
    </>
  );
};

export default ExperimentsAppView;
