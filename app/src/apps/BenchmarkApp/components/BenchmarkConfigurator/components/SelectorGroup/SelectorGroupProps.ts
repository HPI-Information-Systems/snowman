import React from 'react';
export type SelectorItem = {
  icon: string;
  title: string;
  indent?: number;
};

export interface SelectorGroupOwnProps {
  onClick: (event: React.MouseEvent) => void;
  items: SelectorItem[];
}

export type SelectorGroupProps = SelectorGroupOwnProps;
