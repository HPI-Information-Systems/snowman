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
import { getDndDescriptorFromDropResult } from 'utils/dragNDropHelpers';

const IntersectionSelectorView = ({
  ignored,
  excluded,
  included,
  ignore,
  exclude,
  include,
}: IntersectionSelectorProps): JSX.Element => {
  return (
    <IonGrid class="grid-no-padding">
      <IonRow>
        <DragDropContext
          onDragEnd={(result) => {
            const {
              sourceBucket,
              sourceIndex,
              targetBucket,
            } = getDndDescriptorFromDropResult<IntersectionBuckets>(
              result,
              IntersectionBuckets.IGNORED
            );
            const source =
              sourceBucket === IntersectionBuckets.EXCLUDED
                ? excluded[sourceIndex]
                : sourceBucket === IntersectionBuckets.INCLUDED
                ? included[sourceIndex]
                : ignored[sourceIndex];
            switch (targetBucket) {
              case IntersectionBuckets.INCLUDED:
                return include(source);
              case IntersectionBuckets.EXCLUDED:
                return exclude(source);
              default:
                return ignore(source);
            }
          }}
        >
          <IonCol size="4" class="col-no-padding">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>available</IonCardTitle>
              </IonCardHeader>
              <IonGrid class="grid-5px-padding">
                <IntersectionDroppable
                  bucketId={IntersectionBuckets.IGNORED}
                  bucketContent={ignored}
                />
              </IonGrid>
            </IonCard>
          </IonCol>
          <IonCol size="4" class="col-no-padding">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>intersect (∩)</IonCardTitle>
              </IonCardHeader>
              <IonGrid class="grid-5px-padding">
                <IntersectionDroppable
                  bucketId={IntersectionBuckets.INCLUDED}
                  bucketContent={included}
                />
              </IonGrid>
            </IonCard>
          </IonCol>
          <IonCol size="4" class="col-no-padding">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>exclude (\)</IonCardTitle>
              </IonCardHeader>
              <IonGrid class="grid-5px-padding">
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
