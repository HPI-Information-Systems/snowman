import React from 'react';

export interface SelectorItemOwnProps {
  onClick: (event: React.MouseEvent) => void;
  items: { icon: string; title: string; indent: number }[];
}

export type SelectorItemProps = SelectorItemOwnProps;
