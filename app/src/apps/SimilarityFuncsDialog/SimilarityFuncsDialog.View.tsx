import { IonButton, IonIcon, IonList, IonSearchbar } from '@ionic/react';
import SimilarityFuncItem from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItem';
import { SimilarityFuncsDialogProps } from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialogProps';
import { addCircle } from 'ionicons/icons';
import React from 'react';

const SimilarityFuncsDialogView = ({
  searchString,
  similarityThresholdFuncs,
  onChangeSearchString,
}: SimilarityFuncsDialogProps): JSX.Element => (
  <>
    <IonSearchbar value={searchString} onIonChange={onChangeSearchString} />
    <IonList>
      <SimilarityFuncItem functionName="Sample1" />
      <SimilarityFuncItem functionName="Sample2" />
      <SimilarityFuncItem functionName="Sample3" />
      <SimilarityFuncItem functionName="Sample4" />
      <SimilarityFuncItem functionName="Sample5" />
      <SimilarityFuncItem functionName="Sample6" />
    </IonList>
    <IonButton>
      <IonIcon icon={addCircle} />
      Add Similarity Threshold Function
    </IonButton>
  </>
);

export default SimilarityFuncsDialogView;
