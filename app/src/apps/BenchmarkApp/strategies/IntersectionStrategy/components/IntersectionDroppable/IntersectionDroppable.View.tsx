import { IonChip, IonCol, IonGrid, IonLabel, IonRow } from '@ionic/react';
import { IntersectionDroppableProps } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionDroppable/IntersectionDroppableProps';
import {
  stringifyExperimentEntity,
  uniqueExperimentEntityKey,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import React from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { ExperimentEntity } from 'types/ExperimentEntity';
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
    const anExperiment: ExperimentEntity = bucketContent[rubric.source.index];
    if (anExperiment === undefined)
      throw Error('referenced non-existent experiment');

    return (
      <IonRow
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
        <IonCol className="col-5px-padding">
          <IonChip
            color={
              bucketId === IntersectionBuckets.EXCLUDED
                ? 'danger'
                : bucketId === IntersectionBuckets.INCLUDED
                ? 'success'
                : 'dark'
            }
            outline={false}
            key={uniqueExperimentEntityKey(anExperiment)}
          >
            <IonLabel>{stringifyExperimentEntity(anExperiment)}</IonLabel>
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
          className="iongrid-droppable-container"
        >
          {bucketContent.map(
            (anExperiment: ExperimentEntity, index: number): JSX.Element => (
              <Draggable
                key={uniqueExperimentEntityKey(anExperiment)}
                draggableId={uniqueExperimentEntityKey(anExperiment)}
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
