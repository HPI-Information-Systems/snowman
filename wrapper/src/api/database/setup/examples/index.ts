import { exampleAlgorithms, loadExampleAlgorithms } from './algorithms';
import { exampleDatasets, loadExampleDatasets } from './datasets';
import { exampleExperiments, loadExampleExperiments } from './experiments';

export * from './algorithms';
export * from './datasets';
export * from './experiments';

export async function loadExamples(): Promise<void> {
  loadExampleAlgorithms(exampleAlgorithms);
  await loadExampleDatasets(exampleDatasets);
  await loadExampleExperiments(exampleExperiments);
}
