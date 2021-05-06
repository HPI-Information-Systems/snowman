import { IonButton, IonIcon, IonList, IonSearchbar } from '@ionic/react';
import { SimilarityThresholdFunction } from 'api';
import SimilarityFuncItem from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItem';
import { SimilarityFuncsDialogProps } from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialogProps';
import styles from 'apps/SimilarityFuncsDialog/SimiliarityFuncsDialogStyles.module.css';
import { addCircle } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

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
    <div className={style(styles.center, styles.buttonRow)}>
      <IonButton onClick={openAddFunctionBuilder}>
        <IonIcon icon={addCircle} slot="start" />
        Add Similarity Function
      </IonButton>
    </div>
  </>
);

export default SimilarityFuncsDialogView;
