import 'components/IntersectionSelector/IntersectionSelectorStyles.css';

import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { IntersectionBuckets } from '../../types/IntersectionBuckets';
import { getDndDescriptorFromDropResult } from '../../utils/dragNDropHelpers';
import IntersectionDroppable from '../IntersectionDroppable/IntersectionDroppable';
import { IntersectionSelectorProps } from './IntersectionSelectorProps';

const ExperimentIntersectionSelectorView = ({
  ignored,
  excluded,
  included,
  ignore,
  exclude,
  include,
}: IntersectionSelectorProps): JSX.Element => {
  return (
    <IonGrid>
      <IonRow>
        <DragDropContext
          onDragEnd={(result) => {
            const {
              sourceBucket,
              sourceIndex,
              targetBucket,
            } = getDndDescriptorFromDropResult<IntersectionBuckets>(
              result,
              IntersectionBuckets.IRRELEVANT
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
          <IonCol size="4" class="droppable-zone">
            <h2>available</h2>
            <IntersectionDroppable
              bucketId={IntersectionBuckets.IRRELEVANT}
              bucketContent={ignored}
            />
          </IonCol>
          <IonCol size="4" class="droppable-zone">
            <h2>intersect (∩)</h2>
            <IntersectionDroppable
              bucketId={IntersectionBuckets.INCLUDED}
              bucketContent={included}
            />
          </IonCol>
          <IonCol size="4" class="droppable-zone">
            <h2>exclude (\)</h2>
            <IntersectionDroppable
              bucketId={IntersectionBuckets.EXCLUDED}
              bucketContent={excluded}
            />
          </IonCol>
        </DragDropContext>
      </IonRow>
    </IonGrid>
  );
};

export default ExperimentIntersectionSelectorView;
