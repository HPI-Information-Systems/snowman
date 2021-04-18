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
import ExperimentPreviewer from 'components/FilePreviewer/ExperimentPreviewer';
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
  clickOnExperimentFilterTool,
}: ExperimentsPageProps): JSX.Element => {
  useEffect(loadExperiments, [loadExperiments]);
  return (
    <PageStruct title="Experiments Selector">
      <IonGrid>
        <IonRow>
          <DragDropContext onDragEnd={dragExperiment}>
            <IonCol size="6" sizeXl="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="dropzone-title">
                    <span>Available Experiments</span>
                    <IonIcon
                      className="ion-icon"
                      size="large"
                      color={showExperimentFilters ? 'primary' : 'dark'}
                      icon={filterCircleOutline}
                      onClick={clickOnExperimentFilterTool}
                    />
                  </IonCardTitle>
                </IonCardHeader>
                {showExperimentFilters ? (
                  <div className="ms-tags-container">
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
                  </div>
                ) : null}
                <ExperimentDroppable
                  bucketId={ExperimentBuckets.AVAILABLE_EXPERIMENTS}
                />
              </IonCard>
            </IonCol>
            <IonCol size="6" sizeXl="8">
              <IonRow>
                <IonCol size="12" sizeXl="6" className="col-no-padding">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle className="dropzone-title">
                        <span>Selected Ground Truth</span>
                      </IonCardTitle>
                    </IonCardHeader>
                    <ExperimentDroppable
                      bucketId={ExperimentBuckets.CHOSEN_GOLDSTANDARDS}
                    />
                  </IonCard>
                </IonCol>
                <IonCol size="12" sizeXl="6" className="col-no-padding">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle className="dropzone-title">
                        <span>Selected Experiments</span>
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
      <ExperimentPreviewer />
    </PageStruct>
  );
};

export default ExperimentsPageView;
