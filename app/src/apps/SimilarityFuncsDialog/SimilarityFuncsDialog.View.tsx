import { IonItem, IonList, IonSearchbar } from '@ionic/react';
import { SimilarityFuncsDialogProps } from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialogProps';
import React from 'react';

const SimilarityFuncsDialogView = ({
  searchString,
  similarityThresholdFuncs,
  onChangeSearchString,
}: SimilarityFuncsDialogProps): JSX.Element => (
  <>
    <IonSearchbar value={searchString} onIonChange={onChangeSearchString} />
    <IonList>
      <IonItem>Hallo</IonItem>
    </IonList>
  </>
);

export default SimilarityFuncsDialogView;
