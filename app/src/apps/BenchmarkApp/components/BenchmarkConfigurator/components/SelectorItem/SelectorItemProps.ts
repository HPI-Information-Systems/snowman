import React from 'react';

export interface SelectorItemOwnProps {
  onClick: (event: React.MouseEvent) => void;
  FirstItem: string;
  FirstItemIcon: string;
  SecondItem: string;
  SecondItemIcon: string;
  ThirdItem: string;
  ThirdItemIcon: string;
}

export type SelectorItemProps = SelectorItemOwnProps;
