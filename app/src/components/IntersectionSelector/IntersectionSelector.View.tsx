import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';
import IntersectionDroppable from 'components/IntersectionDroppable/IntersectionDroppable';
import { IntersectionSelectorProps } from 'components/IntersectionSelector/IntersectionSelectorProps';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { IntersectionBuckets } from 'types/IntersectionBuckets';

const IntersectionSelectorView = ({
  ignored,
  excluded,
  included,
  dragExperiment,
}: IntersectionSelectorProps): JSX.Element => {
  return (
    <IonGrid className="grid-no-padding">
      <IonRow>
        <DragDropContext onDragEnd={dragExperiment}>
          <IonCol size="4" className="col-no-padding">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>available</IonCardTitle>
              </IonCardHeader>
              <IonGrid className="grid-5px-padding">
                <IntersectionDroppable
                  bucketId={IntersectionBuckets.IGNORED}
                  bucketContent={ignored}
                />
              </IonGrid>
            </IonCard>
          </IonCol>
          <IonCol size="4" className="col-no-padding">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>intersect (∩)</IonCardTitle>
              </IonCardHeader>
              <IonGrid className="grid-5px-padding">
                <IntersectionDroppable
                  bucketId={IntersectionBuckets.INCLUDED}
                  bucketContent={included}
                />
              </IonGrid>
            </IonCard>
          </IonCol>
          <IonCol size="4" className="col-no-padding">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>exclude (\)</IonCardTitle>
              </IonCardHeader>
              <IonGrid className="grid-5px-padding">
                <IntersectionDroppable
                  bucketId={IntersectionBuckets.EXCLUDED}
                  bucketContent={excluded}
                />
              </IonGrid>
            </IonCard>
          </IonCol>
        </DragDropContext>
      </IonRow>
    </IonGrid>
  );
};

export default IntersectionSelectorView;
