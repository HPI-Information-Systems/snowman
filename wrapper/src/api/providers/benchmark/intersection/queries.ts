import { tables } from '../../../database';
import {
  ExperimentConfigItemSimilarity,
  ExperimentId,
} from '../../../server/types';

export class IntersectionQueries {
  experimentLinks(
    experiment: ExperimentId,
    similarity?: ExperimentConfigItemSimilarity
  ): [number, number][] {
    if (similarity) {
      const table = tables.experiment.similarityThresholdFunction(
        experiment,
        similarity.func
      );
      return table.all(
        { similarity: similarity.threshold },
        {
          returnedColumns: [
            table.schema.columns.id1.name,
            table.schema.columns.id2.name,
          ],
          raw: true,
          filterType: '>=',
        }
      ) as [number, number][];
    } else {
      const table = tables.experiment.experiment(experiment);
      return table.all(
        { isDuplicate: 1 },
        {
          returnedColumns: [
            table.schema.columns.id1.name,
            table.schema.columns.id2.name,
          ],
          raw: true,
        }
      ) as [number, number][];
    }
  }
}
