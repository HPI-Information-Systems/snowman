import 'pages/ExperimentsPage/ExperimentsPageStyles.css';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { Algorithm } from 'api';
import AddExperimentFab from 'components/AddFab/AddExperimentFab';
import ExperimentDialog from 'components/ExperimentDialog/ExperimentDialog';
import ExperimentDroppable from 'components/ExperimentDroppable/ExperimentDroppable';
import PageStruct from 'components/PageStruct/PageStruct';
import { filterCircleOutline } from 'ionicons/icons';
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
  showExperimentFilters,
  toggleShowExperimentFilters,
}: ExperimentsPageProps): JSX.Element => {
  useEffect(loadExperiments, [loadExperiments]);
  return (
    <PageStruct title="Experiments Selector" showNextFab={true}>
      <IonGrid>
        <IonRow>
          <DragDropContext onDragEnd={dragExperiment}>
            <IonCol size="6" sizeXl="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle
                    class="dropzone-title"
                    onClick={(): void => toggleShowExperimentFilters()}
                  >
                    <span>Available Experiments</span>
                    <IonIcon
                      size="large"
                      color={showExperimentFilters ? 'primary' : undefined}
                      icon={filterCircleOutline}
                    />
                  </IonCardTitle>

                  {showExperimentFilters
                    ? matchingSolutions.map(
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
                      )
                    : null}
                </IonCardHeader>
                <ExperimentDroppable
                  bucketId={ExperimentBuckets.AVAILABLE_EXPERIMENTS}
                />
              </IonCard>
            </IonCol>
            <IonCol size="6" sizeXl="8">
              <IonRow>
                <IonCol size="12" sizeXl="6" class="col-no-padding">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle class="dropzone-title">
                        Selected Ground Truth
                      </IonCardTitle>
                    </IonCardHeader>
                    <ExperimentDroppable
                      bucketId={ExperimentBuckets.CHOSEN_GOLDSTANDARDS}
                    />
                  </IonCard>
                </IonCol>
                <IonCol size="12" sizeXl="6" class="col-no-padding">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle class="dropzone-title">
                        Selected Experiments
                      </IonCardTitle>
                    </IonCardHeader>
                    <ExperimentDroppable
                      bucketId={ExperimentBuckets.CHOSEN_EXPERIMENTS}
                    />
                  </IonCard>
                </IonCol>
              </IonRow>
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
