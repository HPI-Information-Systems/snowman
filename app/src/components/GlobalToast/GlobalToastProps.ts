import { ToastType } from 'components/GlobalToast/ToastTypes';

export interface GlobalToastDispatchProps {
  close(): void;
}

export interface GlobalToastOwnProps {
  message: string;
  toastType: ToastType;
  toastId: number;
}

export type GlobalToastProps = GlobalToastDispatchProps & GlobalToastOwnProps;
