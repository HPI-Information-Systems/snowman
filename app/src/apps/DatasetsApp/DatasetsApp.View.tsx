import {
  IonChip,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react';
import { Dataset } from 'api';
import DatasetCard from 'apps/DatasetsApp/components/DatasetCard/DatasetCard';
import { DatasetsAppProps } from 'apps/DatasetsApp/DatasetsAppProps';
import AddFab from 'components/simple/GenericFab/AddFab';
import React from 'react';
import { getTagsFromDatasets } from 'utils/tagFactory';

const DatasetsAppView = ({
  datasets,
  currentDatasets,
  selectedTags,
  clickOnTag,
  addDataset,
}: DatasetsAppProps): JSX.Element => {
  const tags = getTagsFromDatasets(datasets);
  return (
    <>
      <div>
        {tags.map(
          (aTag: string): JSX.Element => (
            <IonChip
              color={selectedTags.includes(aTag) ? 'primary' : 'dark'}
              outline={false}
              key={aTag}
              onClick={(): void => clickOnTag(aTag)}
            >
              <IonLabel>{aTag}</IonLabel>
            </IonChip>
          )
        )}
      </div>
      <IonText color="primary">
        <h3>Datasets</h3>
      </IonText>
      <IonGrid>
        <IonRow>
          {currentDatasets.map((aDataset: Dataset) => (
            <IonCol key={'col' + aDataset.id} size="4" sizeXl="3">
              <DatasetCard
                key={`datasetCard-${aDataset.id}`}
                dataset={aDataset}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      {datasets.length === 0 ? (
        <IonText color="medium">No matching elements found!</IonText>
      ) : undefined}
      <AddFab clickOnFab={addDataset} />
    </>
  );
};

export default DatasetsAppView;
