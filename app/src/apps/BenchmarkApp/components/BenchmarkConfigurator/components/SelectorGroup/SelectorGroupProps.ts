import { EntityItemOwnProps } from 'components/simple/EntityItem/EntityItemProps';
import React from 'react';

export type BasicSelectorItem = {
  title: string;
  icon: string;
};

export type EntitySelectorItem = EntityItemOwnProps;

export type SelectorItem = {
  indent?: number;
} & (BasicSelectorItem | EntitySelectorItem);

export interface SelectorGroupOwnProps {
  onClick: (event: React.MouseEvent) => void;
  items: SelectorItem[];
}

export type SelectorGroupProps = SelectorGroupOwnProps;
