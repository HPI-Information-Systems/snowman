import { IonLoading } from '@ionic/react';
import { BlockingLoadingProps } from 'apps/SnowmanApp/components/BlockingLoading/BlockingLoadingProps';
import React from 'react';

const BlockingLoadingView = ({
  showLoading,
}: BlockingLoadingProps): JSX.Element => (
  <IonLoading isOpen={showLoading} message={'Please wait...'} />
);

export default BlockingLoadingView;
