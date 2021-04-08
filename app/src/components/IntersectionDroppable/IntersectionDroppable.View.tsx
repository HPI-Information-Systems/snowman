import { IonChip, IonCol, IonGrid, IonLabel, IonRow } from '@ionic/react';
import { Experiment } from 'api';
import { IntersectionDroppableProps } from 'components/IntersectionDroppable/IntersectionDroppableProps';
import React from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { IntersectionBuckets } from 'types/IntersectionBuckets';

const IntersectionDroppableView = ({
  bucketId,
  bucketContent,
  pairCounts,
}: IntersectionDroppableProps): JSX.Element => {
  const experimentRenderer = (
    provided: DraggableProvided,
    _snapshot: DraggableStateSnapshot,
    rubric: DraggableRubric
  ): JSX.Element => {
    const anExperiment: Experiment = bucketContent[rubric.source.index];
    if (anExperiment === undefined)
      throw Error('referenced non-existent experiment');

    return (
      <IonRow
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
        <IonCol class="col-5px-padding">
          <IonChip
            color={
              bucketId === IntersectionBuckets.EXCLUDED
                ? 'danger'
                : bucketId === IntersectionBuckets.INCLUDED
                ? 'success'
                : 'dark'
            }
            outline={false}
            key={anExperiment.id}
          >
            <IonLabel>
              {anExperiment.name} (
              {pairCounts.get(anExperiment.id) ?? 'unknown'})
            </IonLabel>
          </IonChip>
        </IonCol>
      </IonRow>
    );
  };
  return (
    <Droppable droppableId={bucketId} renderClone={experimentRenderer}>
      {(provided: DroppableProvided): JSX.Element => (
        <IonGrid
          {...provided.droppableProps}
          ref={provided.innerRef}
          class="iongrid-droppable-container"
        >
          {bucketContent.map(
            (anExperiment: Experiment, index: number): JSX.Element => (
              <Draggable
                key={anExperiment.id}
                draggableId={anExperiment.id.toString()}
                index={index}
              >
                {experimentRenderer}
              </Draggable>
            )
          )}
          {provided.placeholder}
        </IonGrid>
      )}
    </Droppable>
  );
};

export default IntersectionDroppableView;
