import 'pages/ExperimentsPage/ExperimentsPageStyles.css';

import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Experiment } from 'api';
import AddExperimentFab from 'components/AddFab/AddExperimentFab';
import ExperimentCard from 'components/ExperimentCard/ExperimentCard';
import ExperimentDialog from 'components/ExperimentDialog/ExperimentDialog';
import ExperimentPreviewer from 'components/FilePreviewer/ExperimentPreviewer';
import PageStruct from 'components/PageStructOLD/PageStruct';
import { ExperimentsPageProps } from 'pages/ExperimentsPage/ExperimentsPageProps';
import React, { useEffect } from 'react';

const ExperimentsPageView = ({
  matchingSolutions,
  selectedMatchingSolutions,
  datasets,
  selectedDatasets,
  currentExperiments,
  loadExperiments,
}: ExperimentsPageProps): JSX.Element => {
  useEffect(loadExperiments, [loadExperiments]);
  return (
    <PageStruct title="Experiments Selector">
      <IonGrid>
        <IonRow>
          {currentExperiments.map((anExperiment: Experiment) => (
            <IonCol key={'col' + anExperiment.id} size="4" sizeXl="3">
              <ExperimentCard
                key={`experimentCard-${anExperiment.id}`}
                experiment={anExperiment}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      <AddExperimentFab />
      <ExperimentDialog />
      <ExperimentPreviewer />
    </PageStruct>
  );
};

export default ExperimentsPageView;
