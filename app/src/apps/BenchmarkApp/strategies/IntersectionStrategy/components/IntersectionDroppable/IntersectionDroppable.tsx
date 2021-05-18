import { IonChip, IonCol, IonGrid, IonRow } from '@ionic/react';
import { IntersectionDroppableProps } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionDroppable/IntersectionDroppableProps';
import {
  experimentEntityToExperimentConfigItem,
  uniqueExperimentEntityKey,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import ExperimentConfigItem from 'components/simple/ExperimentConfigItem/ExperimentConfigItem';
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

const IntersectionDroppable = ({
  bucketId,
  bucketContent,
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
            outline={false}
            key={uniqueExperimentEntityKey(anExperiment)}
            style={{ maxWidth: 'calc(100% - 0.6rem)' }}
          >
            <ExperimentConfigItem
              {...experimentEntityToExperimentConfigItem(anExperiment)}
            />
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

export default IntersectionDroppable;
