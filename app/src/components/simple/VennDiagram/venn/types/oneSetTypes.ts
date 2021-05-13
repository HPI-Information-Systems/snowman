/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramSet } from 'components/simple/VennDiagram/venn/types/types';

export interface VennDiagramOneSetConfig {
  x1: VennDiagramSet;
}

export const VennOneSetPayloadExample: VennDiagramOneSetConfig = {
  x1: {
    text: 'set 1',
    callback: (): void => {
      console.log('clicked set 1');
    },
    tooltip: 'n-items',
    color: 'red',
  },
};
