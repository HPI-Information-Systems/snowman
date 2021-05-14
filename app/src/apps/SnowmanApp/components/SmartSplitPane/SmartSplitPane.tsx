import { IonSplitPane } from '@ionic/react';
import { SmartSplitPaneProps } from 'apps/SnowmanApp/components/SmartSplitPane/SmartSplitPaneProps';
import React from 'react';
import { useSelector } from 'react-redux';

const SmartSplitPane = ({
  disabledSelector,
  children,
}: SmartSplitPaneProps): JSX.Element => {
  const isDisabled: boolean = useSelector(disabledSelector);
  return (
    <IonSplitPane
      when="lg"
      contentId="mainViewContentId"
      className="split-pane-fixed"
      disabled={isDisabled}
    >
      {children}
    </IonSplitPane>
  );
};

export default SmartSplitPane;
