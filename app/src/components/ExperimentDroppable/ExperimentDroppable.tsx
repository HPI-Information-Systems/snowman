import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Experiment } from 'api';
import { ExperimentDroppableProps } from 'components/ExperimentDroppable/ExperimentDroppableProps';
import OptionCard from 'components/OptionCard/OptionCard';
import React from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';

const getRenderItem = (allExperiments: Experiment[]) =>
  function renderedItem(
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
    rubric: DraggableRubric
  ): JSX.Element {
    const anExperiment = allExperiments[rubric.source.index];
    if (anExperiment === undefined)
      throw Error('referenced non-existent experiment');

    return (
      <IonRow
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
        <IonCol>
          <OptionCard
            key={'card' + anExperiment.id}
            title={anExperiment.name}
            subtitle={'anOption.algorithmId'}
            description={anExperiment.description}
            tags={[]}
            isSelected={true}
          />
        </IonCol>
      </IonRow>
    );
  };

const ExperimentDroppable = ({
  bucketId,
  bucketContent,
}: ExperimentDroppableProps): JSX.Element => {
  const renderBucket = getRenderItem(bucketContent);
  return (
    <Droppable droppableId={bucketId} renderClone={renderBucket}>
      {(provided: DroppableProvided): JSX.Element => (
        <IonGrid {...provided.droppableProps} ref={provided.innerRef}>
          {bucketContent.map(
            (anExperiment: Experiment, index: number): JSX.Element => (
              <Draggable
                key={anExperiment.id}
                draggableId={anExperiment.id.toString()}
                index={index}
              >
                {renderBucket}
              </Draggable>
            )
          )}
          {provided.placeholder}
        </IonGrid>
      )}
    </Droppable>
  );
};

export default ExperimentDroppable;
