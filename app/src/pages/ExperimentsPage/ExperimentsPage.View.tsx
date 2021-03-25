import 'pages/ExperimentsPage/ExperimentsPage.Styles.css';

import { IonChip, IonCol, IonGrid, IonLabel, IonRow } from '@ionic/react';
import { Algorithm } from 'api';
import AddExperimentFab from 'components/AddFab/AddExperimentFab';
import ExperimentDialog from 'components/ExperimentDialog/ExperimentDialog';
import ExperimentDroppable from 'components/ExperimentDroppable/ExperimentDroppable';
import PageStruct from 'components/PageStruct/PageStruct';
import { ExperimentsPageProps } from 'pages/ExperimentsPage/ExperimentsPageProps';
import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ExperimentBuckets } from 'types/ExperimentBuckets';
import { isMatchingSolutionSelected } from 'utils/algorithmHelpers';

const ExperimentsPageView = ({
  matchingSolutions,
  selectedMatchingSolutions,
  clickOnMatchingSolution,
  dragExperiment,
  loadExperiments,
  resetIntersection,
}: ExperimentsPageProps): JSX.Element => {
  useEffect(loadExperiments, [loadExperiments]);
  useEffect(resetIntersection, [resetIntersection]);
  return (
    <PageStruct title="Experiments Selector" showNextFab={true}>
      <IonGrid>
        <IonRow>
          <DragDropContext onDragEnd={dragExperiment}>
            <IonCol size="4" class="droppable-zone">
              <h2>Available Experiments</h2>
              {matchingSolutions.map(
                (aMatchingSolution: Algorithm): JSX.Element => (
                  <IonChip
                    color={
                      isMatchingSolutionSelected(
                        aMatchingSolution,
                        selectedMatchingSolutions
                      )
                        ? 'primary'
                        : 'dark'
                    }
                    outline={false}
                    key={aMatchingSolution.id}
                    onClick={(): void =>
                      clickOnMatchingSolution(aMatchingSolution)
                    }
                  >
                    <IonLabel>{aMatchingSolution.name}</IonLabel>
                  </IonChip>
                )
              )}
              <ExperimentDroppable
                bucketId={ExperimentBuckets.AVAILABLE_EXPERIMENTS}
              />
            </IonCol>
            <IonCol size="4" class="droppable-zone">
              <h2>Selected Experiments</h2>
              <ExperimentDroppable
                bucketId={ExperimentBuckets.CHOSEN_EXPERIMENTS}
              />
            </IonCol>
            <IonCol size="4" class="droppable-zone">
              <h2>Selected Ground Truth</h2>
              <ExperimentDroppable
                bucketId={ExperimentBuckets.CHOSEN_GOLDSTANDARDS}
              />
            </IonCol>
          </DragDropContext>
        </IonRow>
      </IonGrid>
      <AddExperimentFab />
      <ExperimentDialog />
    </PageStruct>
  );
};

export default ExperimentsPageView;
