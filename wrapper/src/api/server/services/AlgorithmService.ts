import { getProviders } from '../../providers';
import { Algorithm, AlgorithmId, AlgorithmValues } from '../types';
import { Service, SuccessResponse } from './Service';

function provider() {
  return getProviders().algorithm;
}

/**
 * Creates a new algorithm
 *
 * algorithmValues AlgorithmValues Algorithm object which will be stored
 * returns Integer
 * */
export async function addAlgorithm({
  body,
}: {
  body: AlgorithmValues;
}): Promise<SuccessResponse<AlgorithmId>> {
  return Service.response(() => provider().addAlgorithm(body), 201, 400);
}

/**
 * Deletes an algorithm by id
 *
 * algorithmId Integer The id of an algorithm
 * no response value expected for this operation
 * */
export async function deleteAlgorithm({
  algorithmId,
}: {
  algorithmId: AlgorithmId;
}): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().deleteAlgorithm(algorithmId),
    204,
    500
  );
}
/**
 * Gets an algorithm by id
 *
 * algorithmId Integer The id of an algorithm
 * returns Algorithm
 * */
export async function getAlgorithm({
  algorithmId,
}: {
  algorithmId: AlgorithmId;
}): Promise<SuccessResponse<Algorithm>> {
  return Service.response(() => provider().getAlgorithm(algorithmId), 200, 404);
}

/**
 * Get all algorithms
 *
 * returns List
 * */
export async function getAlgorithms(): Promise<SuccessResponse<Algorithm[]>> {
  return Service.response(() => provider().listAlgorithms(), 200, 500);
}

/**
 * Updates or creates an algorithm
 *
 * algorithmId Integer The id of an algorithm
 * algorithmValues AlgorithmValues updated Algorithm object
 * no response value expected for this operation
 * */
export async function setAlgorithm({
  algorithmId,
  body,
}: {
  algorithmId: AlgorithmId;
  body: AlgorithmValues;
}): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().setAlgorithm(algorithmId, body),
    204,
    400
  );
}
