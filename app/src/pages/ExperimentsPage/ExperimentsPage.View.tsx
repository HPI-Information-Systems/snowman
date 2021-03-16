import { IonChip, IonLabel } from '@ionic/react';
import AddExperimentFab from 'components/AddFab/AddExperimentFab';
import ExperimentDialog from 'components/ExperimentDialog/ExperimentDialog';
import OptionCard from 'components/OptionCard/OptionCard';
import OptionSelector from 'components/OptionSelector/OptionSelector';
import PageStruct from 'components/PageStruct/PageStruct';
import { ExperimentsPageProps } from 'pages/ExperimentsPage/ExperimentsPageProps';
import React, { useEffect } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { Option } from 'types/Option';

const ExperimentsPageView = ({
  experiments,
  matchingSolutions,
  selectedMatchingSolutions,
  selectedExperiments,
  clickOnTag,
  clickOnExperiment,
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

      <DragDropContext onDragEnd={(result): void => console.log(result)}>
        <Droppable droppableId="availableExperiments">
          {(provided: DroppableProvided): JSX.Element => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {experiments.map(
                (anOption: Option, index: number): JSX.Element => (
                  <Draggable
                    key={anOption.id}
                    draggableId={anOption.id.toString()}
                    index={index}
                  >
                    {(provided: DraggableProvided): JSX.Element => (
                      <li
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <OptionCard
                          key={'card' + anOption.id}
                          title={anOption.title}
                          subtitle={anOption.subtitle}
                          description={anOption.description}
                          tags={anOption.tags}
                          clickCard={(): void => clickOnExperiment(anOption.id)}
                          isSelected={true}
                          deleteCard={
                            deleteExperiment !== undefined
                              ? (): void => deleteExperiment(anOption.id)
                              : undefined
                          }
                          editCard={
                            editExperiment !== undefined
                              ? (): void => editExperiment(anOption.id)
                              : undefined
                          }
                          multiple={true}
                        />
                      </li>
                    )}
                  </Draggable>
                )
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <OptionSelector
        title="Experiments"
        optionsList={experiments}
        clickOnCard={clickOnExperiment}
        selected={selectedExperiments}
        deleteCardHandler={deleteExperiment}
        editCardHandler={editExperiment}
        multiple={true}
      />
      <AddExperimentFab />
      <ExperimentDialog />
    </PageStruct>
  );
};

export default ExperimentsPageView;
