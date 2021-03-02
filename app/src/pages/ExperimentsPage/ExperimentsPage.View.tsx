import { IonChip, IonLabel } from '@ionic/react';
import AddExperimentFab from 'components/AddFab/AddExperimentFab';
import ExperimentDialog from 'components/ExperimentDialog/ExperimentDialog';
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
        multiple={true}
      />
      <AddExperimentFab />
      <ExperimentDialog />
    </PageStruct>
  );
};

export default ExperimentsPageView;
