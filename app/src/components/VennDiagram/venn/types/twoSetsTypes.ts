import { VennIntersection } from 'components/VennDiagram/venn/types/types';

export interface VennTwoSets {
  x10: VennIntersection;
  x01: VennIntersection;
  x11: VennIntersection;
}

export const VennTwoSetsExample = {
  x10: {
    title: 'set 1',
    callback: (): void => {
      console.log('clicked set 1');
    },
    tooltip: 'n-items',
    color: 'red',
  },
  x01: {
    title: 'set 2',
    callback: (): void => {
      console.log('clicked set 2');
    },
    tooltip: 'n-items',
    color: 'purple',
  },
  x11: {
    callback: (): void => {
      console.log('clicked intersection x11');
    },
    tooltip: 'n-items',
  },
};
