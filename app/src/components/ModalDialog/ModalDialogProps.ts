import React from 'react';

export interface ModalDialogProps {
  heading: string;
  isOpen: boolean;
  closeDialog(): void;
  children?: React.ReactNode | React.ReactNode[];
}
