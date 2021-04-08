import { getProviders } from '../../providers';
import {
  Experiment,
  ExperimentId,
  ExperimentValues,
  FileResponse,
  Request,
} from '../types';
import { ExperimentFileFormat } from '../types/ExperimentFileFormat';
import { Service, SuccessResponse } from './Service';

function provider() {
  return getProviders().experiment;
}

/**
 * Creates a new Experiment
 *
 * experimentValues ExperimentValues ExperimentObject which will be stored
 * returns Integer
 * */
export async function addExperiment({
  body,
}: {
  body: ExperimentValues;
}): Promise<SuccessResponse<ExperimentId>> {
  return Service.response(() => provider().addExperiment(body), 201, 400);
}

/**
 * Deletes an experiment (including experiment file)
 *
 * experimentId Integer The id of an experiment
 * no response value expected for this operation
 * */
export async function deleteExperiment({
  experimentId,
}: {
  experimentId: ExperimentId;
}): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().deleteExperiment(experimentId),
    204,
    500
  );
}

/**
 * Gets experiment by id
 *
 * experimentId Integer The id of an experiment
 * returns Experiment
 * */
export async function getExperiment({
  experimentId,
}: {
  experimentId: ExperimentId;
}): Promise<SuccessResponse<Experiment>> {
  return Service.response(
    () => provider().getExperiment(experimentId),
    200,
    404
  );
}

/**
 * Get all experiments
 *
 * returns List
 * */
export async function getExperiments(): Promise<SuccessResponse<Experiment[]>> {
  return Service.response(() => provider().listExperiments(), 200, 500);
}

/**
 * Updates or creates an Experiment
 *
 * experimentId Integer The id of an experiment
 * experimentValues ExperimentValues updated Experiment object
 * no response value expected for this operation
 * */
export async function setExperiment({
  experimentId,
  body,
}: {
  experimentId: ExperimentId;
  body: ExperimentValues;
}): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().setExperiment(experimentId, body),
    204,
    400
  );
}

/**
 * Gets an experiment file by id
 * Always returns one row with column names followed by the requested amount of rows. To only return the column names, pass startAt=0 and limit=0.
 *
 * experimentId Integer The id of an experiment
 * startAt Integer  (optional)
 * limit Integer  (optional)
 * sortBy String  (optional)
 * returns File
 * */
export async function getExperimentFile({
  experimentId,
  startAt,
  limit,
  sortBy,
}: {
  experimentId: ExperimentId;
  startAt?: number;
  limit?: number;
  sortBy?: string;
}): Promise<SuccessResponse<FileResponse>> {
  return Service.response(
    () => provider().getExperimentFile(experimentId, startAt, limit, sortBy),
    200,
    404
  );
}

/**
 * Updates or creates an experiment file
 *
 * experimentId Integer The id of an experiment
 * format String the format of the experiment file
 * body File updated experiment file
 * no response value expected for this operation
 * */
export async function setExperimentFile(
  {
    experimentId,
    format,
  }: {
    experimentId: ExperimentId;
    format: ExperimentFileFormat;
  },
  request: Request
): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().setExperimentFile(experimentId, format, request),
    204,
    400
  );
}
