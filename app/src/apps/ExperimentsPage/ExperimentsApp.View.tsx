import 'apps/ExperimentsPage/ExperimentsAppStyles.css';

import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Experiment } from 'api';
import { ExperimentsAppProps } from 'apps/ExperimentsPage/ExperimentsAppProps';
import ExperimentCard from 'components/ExperimentCard/ExperimentCard';
import React from 'react';
import { getAlgorithmNameFromId } from 'utils/algorithmHelpers';
import { getDatasetNameFromId } from 'utils/datasetHelper';

const ExperimentsAppView = ({
  algorithms,
  experiments,
  selectedAlgorithms,
  datasets,
  selectedDatasets,
  currentExperiments,
}: ExperimentsAppProps): JSX.Element => {
  return (
    <>
      <IonGrid>
        <IonRow>
          {experiments.map((anExperiment: Experiment) => (
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
