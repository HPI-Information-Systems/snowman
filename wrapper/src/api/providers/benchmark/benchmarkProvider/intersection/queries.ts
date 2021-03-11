import { databaseBackend, Table } from '../../../../database';
import { latest } from '../../../../database/schemas';
import { ExperimentId } from '../../../../server/types';

export class IntersectionQueries {
  experimentLinks(experiment: ExperimentId): [number, number][] {
    const schema = latest.tableSchemas.experiment.experiment(experiment);
    const table = new Table(schema);
    const links = databaseBackend()
      .prepare(
        `
          SELECT "${schema.columns.id1.name}", "${schema.columns.id2.name}"
            FROM ${table}
           WHERE "${schema.columns.isDuplicate.name}" = 1
        `
      )
      .raw(true)
      .all() as [number, number][];
    return links;
  }
}
