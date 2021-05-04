import { IonButton, IonIcon, IonList, IonSearchbar } from '@ionic/react';
import { SimilarityThresholdFunction } from 'api';
import SimilarityFuncItem from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItem';
import { SimilarityFuncsDialogProps } from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialogProps';
import { addCircle } from 'ionicons/icons';
import React from 'react';

const SimilarityFuncsDialogView = ({
  searchString,
  similarityThresholdFuncs,
  onChangeSearchString,
  openAddFunctionBuilder,
}: SimilarityFuncsDialogProps): JSX.Element => (
  <>
    <IonSearchbar value={searchString} onIonChange={onChangeSearchString} />
    <IonList>
      {similarityThresholdFuncs.map(
        (aSimilarityFunction: SimilarityThresholdFunction): JSX.Element => (
          <SimilarityFuncItem
            key={aSimilarityFunction.id}
            similarityFunction={aSimilarityFunction}
          />
        )
      )}
    </IonList>
    <IonButton onClick={openAddFunctionBuilder}>
      <IonIcon icon={addCircle} />
      Add Similarity Threshold Function
    </IonButton>
  </>
);

export default SimilarityFuncsDialogView;
