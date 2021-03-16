import { IonChip, IonLabel } from '@ionic/react';
import AddExperimentFab from 'components/AddFab/AddExperimentFab';
import ExperimentDialog from 'components/ExperimentDialog/ExperimentDialog';
import ExperimentDroppable from 'components/ExperimentDroppable/ExperimentDroppable';
import PageStruct from 'components/PageStruct/PageStruct';
import { ExperimentsPageProps } from 'pages/ExperimentsPage/ExperimentsPageProps';
import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ExperimentBuckets } from 'types/ExperimentBuckets';

const ExperimentsPageView = ({
  availableExperiments,
  matchingSolutions,
  selectedMatchingSolutions,
  chosenExperiments,
  chosenGoldstandards,
  clickOnTag,
  dragExperiment,
  deleteExperiment,
  editExperiment,
  loadExperiments,
}: ExperimentsPageProps): JSX.Element => {
  useEffect((): void => loadExperiments(), [loadExperiments]);
  return (
    <PageStruct title="Experiments Selector" showNextFab={true}>
      {matchingSolutions.map(
        (aTag: string): JSX.Element => (
          <IonChip
            color={
              selectedMatchingSolutions.includes(aTag) ? 'primary' : 'dark'
            }
            outline={false}
            key={aTag}
            onClick={(): void => clickOnTag(aTag)}
          >
            <IonLabel>{aTag}</IonLabel>
          </IonChip>
        )
      )}
      <DragDropContext
        onDragEnd={(aDropResult: DropResult): void =>
          dragExperiment({
            sourceBucket: aDropResult.source.droppableId as ExperimentBuckets,
            sourceIndex: aDropResult.source.index,
            targetBucket: (aDropResult.destination?.droppableId ??
              ExperimentBuckets.AVAILABLE_EXPERIMENTS) as ExperimentBuckets,
            targetIndex: aDropResult.destination?.index ?? 0,
          })
        }
      >
        <ExperimentDroppable
          bucketContent={availableExperiments}
          bucketId={ExperimentBuckets.AVAILABLE_EXPERIMENTS}
        />
        <ExperimentDroppable
          bucketContent={chosenExperiments}
          bucketId={ExperimentBuckets.CHOSEN_EXPERIMENTS}
        />
        <ExperimentDroppable
          bucketContent={chosenGoldstandards}
          bucketId={ExperimentBuckets.CHOSEN_GOLDSTANDARDS}
        />
      </DragDropContext>
      <AddExperimentFab />
      <ExperimentDialog />
    </PageStruct>
  );
};

export default ExperimentsPageView;
