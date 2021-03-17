import {
  IonChip,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react';
import AddDatasetFab from 'components/AddFab/AddDatasetFab';
import DatasetDialog from 'components/DatasetDialog/DatasetDialog';
import OptionCard from 'components/OptionCard/OptionCard';
import PageStruct from 'components/PageStruct/PageStruct';
import { DatasetsPageProps } from 'pages/DatasetsPage/DatasetsPageProps';
import React, { useEffect } from 'react';
import { Option } from 'types/Option';

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
          {datasets.map((aDataset: Option) => (
            <IonCol key={'col' + aDataset.id} size="4" sizeXl="3">
              <OptionCard
                key={'card' + aDataset.id}
                title={aDataset.title}
                subtitle={aDataset.subtitle}
                description={aDataset.description}
                tags={aDataset.tags}
                clickCard={() => clickOnDataset(aDataset.id)}
                isSelected={selectedDataset.includes(aDataset.id)}
                deleteCard={() => deleteDataset(aDataset.id)}
                editCard={() => editDataset(aDataset.id)}
                multiple={false}
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
