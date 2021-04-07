import type { ExperimentInserter } from './experimentInserter';
import { BHANAExperimentInserter } from './formats/bHana';
import { BPIESExperimentInserter } from './formats/bPies';
import { ClusterERExperimentInserter } from './formats/clusterER';
import { MagellanExperimentInserter } from './formats/magellan';
import { PilotExperimentInserter } from './formats/pilot';
import { Sigmod2021ExperimentInserter } from './formats/sigmod2021';

type InstantiableExperimentInserter = {
  new (
    ...args: ConstructorParameters<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (new (...args: any) => any) & typeof ExperimentInserter
    >
  ): ExperimentInserter;
};

export const experimentFormats = [
  ['magellan', MagellanExperimentInserter],
  ['clusterER', ClusterERExperimentInserter],
  ['pilot', PilotExperimentInserter],
  ['sigmod2021', Sigmod2021ExperimentInserter],
  ['BHANA', BHANAExperimentInserter],
  ['BPIES', BPIESExperimentInserter],
] as const;
const experimentInserters = new Map<string, InstantiableExperimentInserter>(
  experimentFormats
);

export function getExperimentInserter(
  formatId: typeof experimentFormats[number][0]
): InstantiableExperimentInserter {
  const ExperimentLoader = experimentInserters.get(formatId);
  if (!ExperimentLoader) {
    throw new Error(
      `Unknown experiment file format: ${formatId}. Known formats are: ${experimentFormats
        .map(([format]) => format)
        .join(', ')}`
    );
  }
  return ExperimentLoader;
}
