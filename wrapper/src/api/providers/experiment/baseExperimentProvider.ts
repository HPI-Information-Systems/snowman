import { Readable } from 'stream';

import { Experiment, ExperimentId, ExperimentValues } from '../../server/types';
import { ExperimentFileFormat } from '../../server/types/ExperimentFileFormat';

export abstract class BaseExperimentProvider {
  abstract listExperiments(): Experiment[];
  abstract addExperiment(experiment: ExperimentValues): ExperimentId;
  abstract getExperiment(id: ExperimentId): Experiment;
  abstract setExperiment(id: ExperimentId, experiment: ExperimentValues): void;
  abstract deleteExperiment(id: ExperimentId): void;
  abstract getExperimentFile(
    id: ExperimentId,
    startAt?: number,
    limit?: number,
    sortBy?: string
  ): IterableIterator<string[]>;
  abstract setExperimentFile(
    id: ExperimentId,
    format: ExperimentFileFormat,
    file: Readable
  ): Promise<void>;
  abstract deleteExperimentFile(id: ExperimentId): void;
}
