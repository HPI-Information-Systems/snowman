import React from 'react';

export interface SelectorGroupOwnProps {
  onClick: (event: React.MouseEvent) => void;
  items: { icon: string; title: string; indent?: number }[];
}

export type SelectorGroupProps = SelectorGroupOwnProps;
