import { providers } from '../../providers';
import {
  AddExperimentRequest,
  DeleteExperimentRequest,
  Experiment,
  ExperimentId,
  FileResponse,
  GetExperimentFileRequest,
  GetExperimentRequest,
  Request,
  SetExperimentFileRequest,
  SetExperimentRequest,
} from '../types';
import { Service, SuccessResponse } from './Service';

function provider() {
  return providers.experiment;
}

export async function addExperiment({
  experiment,
}: AddExperimentRequest): Promise<SuccessResponse<ExperimentId>> {
  return Service.response(() => provider().addExperiment(experiment), 201, 400);
}

export async function deleteExperiment({
  experimentId,
}: DeleteExperimentRequest): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().deleteExperiment(experimentId),
    204,
    500
  );
}

export async function getExperiment({
  experimentId,
}: GetExperimentRequest): Promise<SuccessResponse<Experiment>> {
  return Service.response(
    () => provider().getExperiment(experimentId),
    200,
    404
  );
}

export async function getExperiments(): Promise<SuccessResponse<Experiment[]>> {
  return Service.response(() => provider().listExperiments(), 200, 500);
}

export async function setExperiment({
  experimentId,
  experiment,
}: SetExperimentRequest): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().setExperiment(experimentId, experiment),
    204,
    400
  );
}

export async function getExperimentFile(
  request: GetExperimentFileRequest
): Promise<SuccessResponse<FileResponse>> {
  return Service.response(
    () => provider().getExperimentFile(request),
    200,
    404
  );
}

export async function setExperimentFile(
  { experimentId, format }: SetExperimentFileRequest,
  request: Request
): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().setExperimentFile(experimentId, format, request),
    204,
    400
  );
}
