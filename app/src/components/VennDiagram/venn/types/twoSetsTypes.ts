/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramEntity } from 'components/VennDiagram/venn/types/types';

export interface VennTwoSetsPayload {
  x10: VennDiagramEntity;
  x01: VennDiagramEntity;
  x11: VennDiagramEntity;
}

export const VennTwoSetsPayloadExample = {
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
