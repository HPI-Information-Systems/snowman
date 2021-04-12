import { providers } from '../../providers';
import {
  AddSimilarityThresholdFunctionRequest,
  DeleteSimilarityThresholdFunctionRequest,
  GetSimilarityThresholdFunctionRequest,
  GetSimilarityThresholdFunctionsRequest,
  SetSimilarityThresholdFunctionRequest,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionId,
} from '../types';
import { Service, SuccessResponse } from './Service';

function provider() {
  return providers.similarityThresholds;
}

export async function addSimilarityThresholdFunction(
  params: AddSimilarityThresholdFunctionRequest
): Promise<SuccessResponse<SimilarityThresholdFunctionId>> {
  return Service.response(
    () => provider().addSimilarityThresholdFunction(params),
    201,
    400
  );
}

export async function deleteSimilarityThresholdFunction(
  params: DeleteSimilarityThresholdFunctionRequest
): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().deleteSimilarityThresholdFunction(params),
    204,
    400
  );
}

export async function getSimilarityThresholdFunction(
  params: GetSimilarityThresholdFunctionRequest
): Promise<SuccessResponse<SimilarityThresholdFunction>> {
  return Service.response(
    () => provider().getSimilarityThresholdFunction(params),
    200,
    404
  );
}

export async function getSimilarityThresholdFunctions(
  params: GetSimilarityThresholdFunctionsRequest
): Promise<SuccessResponse<SimilarityThresholdFunction[]>> {
  return Service.response(
    () => provider().getSimilarityThresholdFunctions(params),
    200,
    404
  );
}

export async function setSimilarityThresholdFunction(
  params: SetSimilarityThresholdFunctionRequest
): Promise<SuccessResponse<void>> {
  return Service.response(
    () => provider().setSimilarityThresholdFunction(params),
    204,
    400
  );
}
