import { getProviders } from '../../../providers';
import { idSorter } from '../../tools/idSorter';
import { setupDatabase } from '../setup';
import { expectedAlgorithms } from './expected.algorithms';
import { expectedDatasets } from './expected.datasets';
import { expectedExperiments } from './expected.experiments';

describe('Automatic Database Setup', () => {
  test('does not load example entries when disabled', async () => {
    await setupDatabase({ temporary: true, loadExampleEntries: false });
    const providers = getProviders();
    const uploadedAlgorithms = providers.algorithm.listAlgorithms();
    const uploadedDatasets = providers.dataset.listDatasets();
    const uploadedExperiments = providers.experiment.listExperiments();
    expect(uploadedAlgorithms.length).toBe(0);
    expect(uploadedDatasets.length).toBe(0);
    expect(uploadedExperiments.length).toBe(0);
  });
  test('loads example entries when enabled', async () => {
    await setupDatabase({ temporary: true, loadExampleEntries: true });
    const providers = getProviders();
    const uploadedAlgorithms = providers.algorithm
      .listAlgorithms()
      .sort(idSorter);
    const uploadedDatasets = providers.dataset.listDatasets().sort(idSorter);
    const uploadedExperiments = providers.experiment
      .listExperiments()
      .sort(idSorter);
    expect(uploadedAlgorithms).toEqual(expectedAlgorithms);
    expect(uploadedDatasets).toEqual(expectedDatasets);
    expect(uploadedExperiments).toEqual(expectedExperiments);
  }, 10_000_000); // ~3h timeout
});
