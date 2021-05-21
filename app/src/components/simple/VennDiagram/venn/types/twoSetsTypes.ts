/*------------ See README.txt for license and copyright information! -----------*/
import {
  VennDiagramIntersection,
  VennDiagramSet,
} from 'components/simple/VennDiagram/venn/types/types';

export interface VennDiagramTwoSetsConfig {
  x10: VennDiagramSet;
  x01: VennDiagramSet;
  x11: VennDiagramIntersection;
}

export const VennTwoSetsPayloadExample: VennDiagramTwoSetsConfig = {
  x10: {
    text: 'set 1',
    callback: (): void => {
      console.log('clicked set 1');
    },
    tooltip: 'n-items',
    color: 'red',
  },
  x01: {
    text: 'set 2',
    callback: (): void => {
      console.log('clicked set 2');
    },
    tooltip: 'n-items',
    color: 'pink',
  },
  x11: {
    callback: (): void => {
      console.log('clicked intersection x11');
    },
    tooltip: 'n-items',
  },
};
