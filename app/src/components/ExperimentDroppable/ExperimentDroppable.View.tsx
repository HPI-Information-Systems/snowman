import 'components/ExperimentDroppable/ExperimentDroppableStyles.css';

import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Experiment } from 'api';
import ExperimentCard from 'components/ExperimentCard/ExperimentCard';
import { ExperimentDroppableProps } from 'components/ExperimentDroppable/ExperimentDroppableProps';
import React from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';

const ExperimentDroppableView = ({
  bucketId,
  bucketContent,
  isDropDisabled,
}: ExperimentDroppableProps): JSX.Element => {
  const experimentRenderer = (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
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
        <IonCol>
          <ExperimentCard
            key={`experimentCard-${anExperiment.id}`}
            experiment={anExperiment}
          />
        </IonCol>
      </IonRow>
    );
  };
  return (
    <Droppable
      droppableId={bucketId}
      renderClone={experimentRenderer}
      isDropDisabled={isDropDisabled}
    >
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

export default ExperimentDroppableView;
