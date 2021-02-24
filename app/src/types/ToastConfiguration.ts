import { ToastType } from 'types/ToastTypes';

export interface ToastConfiguration {
  // if id == -1, we assume that it is only a prototype of a toast
  id: number;
  message: string;
  type: ToastType;
}
