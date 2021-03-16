import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Experiment } from 'api';
import { ExperimentDroppableProps } from 'components/ExperimentDroppable/ExperimentDroppableProps';
import OptionCard from 'components/OptionCard/OptionCard';
import React from 'react';
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';

const ExperimentDroppable = ({
  bucketId,
  bucketContent,
}: ExperimentDroppableProps): JSX.Element => (
  <Droppable droppableId={bucketId}>
    {(provided: DroppableProvided): JSX.Element => (
      <IonGrid {...provided.droppableProps} ref={provided.innerRef}>
        {bucketContent.map(
          (anExperiment: Experiment, index: number): JSX.Element => (
            <Draggable
              key={anExperiment.id}
              draggableId={anExperiment.id.toString()}
              index={index}
            >
              {(provided: DraggableProvided): JSX.Element => (
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
              )}
            </Draggable>
          )
        )}
        {provided.placeholder}
      </IonGrid>
    )}
  </Droppable>
);

export default ExperimentDroppable;
