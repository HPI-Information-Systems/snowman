import { Clustering } from '../cluster/types';
import { IntersectionBase } from './intersectionBase';

export abstract class IntersectionOnlyIncludes extends IntersectionBase {
  abstract clustering: Clustering;

  get numberPairs(): number {
    return this.clustering.numberPairs;
  }
  get numberRows(): number {
    return this.clustering.numberRows;
  }
}
