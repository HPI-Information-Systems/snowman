import {
  IonChip,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react';
import { Dataset } from 'api';
import AddDatasetFab from 'components/AddFab/AddDatasetFab';
import DatasetCard from 'components/DatasetCard/DatasetCard';
import DatasetDialog from 'components/DatasetDialog/DatasetDialog';
import PageStruct from 'components/PageStruct/PageStruct';
import { DatasetsPageProps } from 'pages/DatasetsPage/DatasetsPageProps';
import React, { useEffect } from 'react';

const DatasetsPageView = ({
  tags,
  datasets,
  selectedTags,
  selectedDataset,
  clickOnTag,
  clickOnDataset,
  deleteDataset,
  editDataset,
  loadDatasets,
}: DatasetsPageProps): JSX.Element => {
  useEffect((): void => loadDatasets(), [loadDatasets]);
  return (
    <PageStruct title="Dataset Selector" showNextFab={true}>
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
          {datasets.map((aDataset: Dataset) => (
            <IonCol key={'col' + aDataset.id} size="4" sizeXl="3">
              <DatasetCard
                key={`datasetCard-${aDataset.id}`}
                datasetName={aDataset.name}
                categories={aDataset.tags ?? []}
                description={aDataset.description}
                totalCount={aDataset.numberOfRecords}
                uploadedCount={aDataset.numberOfUploadedRecords}
                isSelected={selectedDataset.includes(aDataset.id)}
                selectDataset={() => clickOnDataset(aDataset.id)}
                deleteDataset={() => deleteDataset(aDataset.id)}
                editDataset={() => editDataset(aDataset.id)}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      {datasets.length === 0 ? (
        <IonText color="medium">No matching elements found!</IonText>
      ) : undefined}
      <AddDatasetFab />
      <DatasetDialog />
    </PageStruct>
  );
};

export default DatasetsPageView;
