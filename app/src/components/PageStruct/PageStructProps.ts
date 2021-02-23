import React from 'react';

export interface PageStructOwnProps {
  title: string;
  showNextFab?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

export interface PageStructStateProps {
  showIndicator: boolean;
}

export type PageStructProps = PageStructOwnProps & PageStructStateProps;
