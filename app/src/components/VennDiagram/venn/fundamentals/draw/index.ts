import { d3Selection } from 'components/VennDiagram/venn/types/types';

export * from 'components/VennDiagram/venn/fundamentals/draw/circle';
export * from 'components/VennDiagram/venn/fundamentals/draw/ellipsis';
export * from 'components/VennDiagram/venn/fundamentals/draw/intersection';
export * from 'components/VennDiagram/venn/fundamentals/draw/text';
export * from 'components/VennDiagram/venn/fundamentals/draw/tooltip';

export const clearSelection = (selection: d3Selection): void => {
  selection.selectAll('*').remove();
};
