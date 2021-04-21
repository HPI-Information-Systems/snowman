import {
  DiagramExperimentItem,
  SoftKPIsExperimentEnum,
} from '../../../server/types';
import { ExperimentProvider } from '../../experiment/experimentProvider';

export function getSoftKPIData(
  value: SoftKPIsExperimentEnum,
  experiments: Array<DiagramExperimentItem>
) {
  const experimentProvider = new ExperimentProvider();
  experiments.forEach((experiment) => {});
}
