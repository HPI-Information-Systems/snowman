import { IonLoading } from '@ionic/react';
import { GlobalLoadingProps } from 'components/GlobalLoading/GlobalLoadingProps';
import React from 'react';

const GlobalLoadingView = ({
  showLoading,
}: GlobalLoadingProps): JSX.Element => (
  <IonLoading isOpen={showLoading} message={'Please wait...'} />
);

export default GlobalLoadingView;
