import 'components/PaneButtonRow/PaneButtonRowStyles.css';

import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import { PaneButtonRowProps } from 'components/PaneButtonRow/PaneButtonRowProps';
import React from 'react';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

const PaneButtonRow = ({
  paneTitles,
  selectedPaneTitle,
  onSelect,
}: PaneButtonRowProps): JSX.Element => (
  <IonGrid className="pane-container">
    <IonRow>
      {paneTitles.map((aMetricsTuplesCategory: MetricsTuplesCategories) =>
        selectedPaneTitle === aMetricsTuplesCategory ? (
          <IonCol
            key={'pane-' + aMetricsTuplesCategory}
            className="pane-header pane-header-active"
          >
            <IonButton
              className="pane-button pane-button-active"
              expand="full"
              fill="clear"
              onClick={(): void => onSelect(aMetricsTuplesCategory)}
            >
              {aMetricsTuplesCategory}
            </IonButton>
          </IonCol>
        ) : (
          <IonCol
            key={'pane-' + aMetricsTuplesCategory}
            className="pane-header"
          >
            <IonButton
              className="pane-button"
              expand="full"
              fill="clear"
              onClick={(): void => onSelect(aMetricsTuplesCategory)}
            >
              {aMetricsTuplesCategory}
            </IonButton>
          </IonCol>
        )
      )}
    </IonRow>
  </IonGrid>
);

export default PaneButtonRow;
