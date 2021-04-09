import { providers } from '../../providers';
import {
  AddAlgorithmRequest,
  Algorithm,
  AlgorithmId,
  DeleteAlgorithmRequest,
  GetAlgorithmRequest,
  SetAlgorithmRequest,
} from '../types';
import { Service, SuccessResponse } from './Service';

function provider() {
  return providers.algorithm;
}

export async function addAlgorithm({
  algorithm,
}: AddAlgorithmRequest): Promise<SuccessResponse<AlgorithmId>> {
  return Service.response(() => provider().addAlgorithm(algorithm), 201, 400);
}

export async function deleteAlgorithm({
  algorithmId,
}: DeleteAlgorithmRequest): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().deleteAlgorithm(algorithmId),
    204,
    500
  );
}

export async function getAlgorithm({
  algorithmId,
}: GetAlgorithmRequest): Promise<SuccessResponse<Algorithm>> {
  return Service.response(() => provider().getAlgorithm(algorithmId), 200, 404);
}

export async function getAlgorithms(): Promise<SuccessResponse<Algorithm[]>> {
  return Service.response(() => provider().listAlgorithms(), 200, 500);
}

export async function setAlgorithm({
  algorithmId,
  algorithm,
}: SetAlgorithmRequest): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().setAlgorithm(algorithmId, algorithm),
    204,
    400
  );
}
