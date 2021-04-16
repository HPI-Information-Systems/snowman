import React from 'react';

export interface PageStructOwnProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
}

export interface PageStructStateProps {
  showIndicator: boolean;
}

export type PageStructProps = PageStructOwnProps & PageStructStateProps;
