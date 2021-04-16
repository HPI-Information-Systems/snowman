import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
} from '@ionic/react';
import { checkmarkCircleOutline, radioButtonOffOutline } from 'ionicons/icons';
import React from 'react';

const ExperimentSelector = ({
  contentId,
}: {
  contentId: string;
}): JSX.Element => {
  const experiments: { label: string; selected?: boolean }[] = [
    { label: 'match2391' },
    { label: 'match58592' },
    { label: 'match2391' },
    { label: 'match2391', selected: true },
    { label: 'match2391', selected: true },
    { label: 'match2391' },
    { label: 'match2391', selected: true },
  ];
  return (
    <IonMenu contentId={contentId}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonSearchbar placeholder="Search experiments" />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Filter by datasets</IonLabel>
            <IonSelect multiple={true} placeholder="<no filter applied>">
              <IonSelectOption>hpi-restaurants</IonSelectOption>
              <IonSelectOption>SIGMOD X</IonSelectOption>
              <IonSelectOption>SIGMOD Y</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Filter by matching solutions</IonLabel>
            <IonSelect multiple={true} placeholder="<no filter applied>">
              <IonSelectOption>Mock solution</IonSelectOption>
              <IonSelectOption>Magellan</IonSelectOption>
              <IonSelectOption>PassiveER</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        <IonList>
          <IonItemDivider>Experiments</IonItemDivider>
          {experiments.map(
            (experiment): JSX.Element => (
              <IonItem key={`selector_item_${experiment.label}`}>
                <IonIcon
                  icon={
                    experiment.selected
                      ? checkmarkCircleOutline
                      : radioButtonOffOutline
                  }
                  color={experiment.selected ? 'primary' : 'medium'}
                  slot="end"
                />
                <IonLabel>
                  <h3>{experiment.label}</h3>
                  <IonText color="medium">
                    <p>Dataset: x1jda, M.Solution: aifijaf</p>
                  </IonText>
                </IonLabel>
              </IonItem>
            )
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default ExperimentSelector;
