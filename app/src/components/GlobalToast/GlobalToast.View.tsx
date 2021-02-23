import { IonToast } from '@ionic/react';
import { GlobalToastProps } from 'components/GlobalToast/GlobalToastProps';
import { ToastType } from 'components/GlobalToast/ToastTypes';
import React from 'react';

const mapToastTypeToColor = (type: ToastType): string => {
  switch (type) {
    case ToastType.Normal:
      return 'dark';
    case ToastType.Success:
      return 'success';
    case ToastType.Warning:
      return 'warning';
    case ToastType.Error:
      return 'danger';
  }
};

const GlobalToastView = ({
  close,
  message,
  toastType,
}: GlobalToastProps): JSX.Element => (
  <IonToast
    isOpen={true}
    onDidDismiss={close}
    message={message}
    color={mapToastTypeToColor(toastType)}
    buttons={['OK']}
    duration={12000}
  />
);

export default GlobalToastView;
