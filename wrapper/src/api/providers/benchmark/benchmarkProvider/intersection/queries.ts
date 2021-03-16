import { tables } from '../../../../database';
import { ExperimentId } from '../../../../server/types';

export class IntersectionQueries {
  experimentLinks(experiment: ExperimentId): [number, number][] {
    const table = tables.experiment.experiment(experiment);
    return table.all(
      { isDuplicate: 1 },
      [table.schema.columns.id1.name, table.schema.columns.id2.name],
      true
    ) as [number, number][];
  }
}
