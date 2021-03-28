import { d3Selection } from '../../types/types';

export * from './circle';
export * from './ellipsis';
export * from './intersection';
export * from './text';
export * from './tooltip';

export const clearSelection = (selection: d3Selection): void => {
  selection.selectAll('*').remove();
};
