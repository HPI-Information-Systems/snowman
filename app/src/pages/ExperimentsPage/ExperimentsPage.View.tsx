import { IonChip, IonLabel } from '@ionic/react';
import AddExperimentDialog from 'components/AddExperimentDialog/AddExperimentDialog';
import AddExperimentFab from 'components/AddFab/AddExperimentFab';
import OptionSelector from 'components/OptionSelector/OptionSelector';
import PageStruct from 'components/PageStruct/PageStruct';
import { ExperimentsPageProps } from 'pages/ExperimentsPage/ExperimentsPageProps';
import React, { useEffect } from 'react';

const ExperimentsPageView = ({
  experiments,
  matchingSolutions,
  selectedMatchingSolutions,
  selectedExperiments,
  clickOnTag,
  clickOnExperiment,
  deleteExperiment,
  loadExperiments,
}: ExperimentsPageProps): JSX.Element => {
  useEffect((): void => loadExperiments(), [loadExperiments]);
  return (
    <PageStruct title="Experiments Selector" showNextFab={true}>
      {matchingSolutions.map(
        (aTag: string): JSX.Element => (
          <IonChip
            color={
              selectedMatchingSolutions.includes(aTag) ? 'primary' : 'dark'
            }
            outline={false}
            key={aTag}
            onClick={(): void => clickOnTag(aTag)}
          >
            <IonLabel>{aTag}</IonLabel>
          </IonChip>
        )
      )}
      <OptionSelector
        title="Experiments"
        optionsList={experiments}
        clickOnCard={clickOnExperiment}
        selected={selectedExperiments}
        deleteCardHandler={deleteExperiment}
        editCardHandler={(id: number) => console.log('Edit with id', id)}
        multiple={true}
      />
      <AddExperimentFab />
      <AddExperimentDialog />
    </PageStruct>
  );
};

export default ExperimentsPageView;
