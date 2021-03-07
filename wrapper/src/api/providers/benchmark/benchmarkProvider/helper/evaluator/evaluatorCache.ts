import { ExperimentId } from '../../../../../server/types';
import { UnionFind } from '../cluster/unionFind';
import { Evaluator } from './evaluator';
import { EvaluatorQueries } from './queries';

export class EvaluatorCache {
  protected readonly cache = new Map<
    ExperimentId,
    Map<ExperimentId, Evaluator>
  >();
  protected readonly queries = new EvaluatorQueries();

  evaluate(
    goldStandard: ExperimentId,
    experiment: ExperimentId,
    recordCount: number
  ): Evaluator {
    let goldCache = this.cache.get(goldStandard);
    if (!goldCache) {
      goldCache = new Map<ExperimentId, Evaluator>();
      this.cache.set(goldStandard, goldCache);
    }
    let evaluator = goldCache.get(experiment);
    if (!evaluator) {
      evaluator = this.createEvaluator(goldStandard, experiment, recordCount);
      goldCache.set(experiment, evaluator);
    }
    this.cache.clear();
    return evaluator;
  }

  protected createEvaluator(
    goldStandard: ExperimentId,
    experiment: ExperimentId,
    recordCount: number
  ): Evaluator {
    return new Evaluator(
      new UnionFind(recordCount).link(
        this.queries.experimentLinks(goldStandard)
      ),
      new UnionFind(recordCount).link(this.queries.experimentLinks(experiment))
    );
  }
}
