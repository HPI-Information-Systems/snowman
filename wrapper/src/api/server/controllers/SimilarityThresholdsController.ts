import { Response } from 'express';

import * as service from '../services/SimilarityThresholdsService';
import { Request } from '../types/util';
import { Controller } from './Controller';

export async function addSimilarityThresholdFunction(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(
    request,
    response,
    service.addSimilarityThresholdFunction
  );
}

export async function deleteSimilarityThresholdFunction(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(
    request,
    response,
    service.deleteSimilarityThresholdFunction
  );
}

export async function getSimilarityThresholdFunction(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(
    request,
    response,
    service.getSimilarityThresholdFunction
  );
}

export async function getSimilarityThresholdFunctions(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(
    request,
    response,
    service.getSimilarityThresholdFunctions
  );
}

export async function setSimilarityThresholdFunction(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(
    request,
    response,
    service.setSimilarityThresholdFunction
  );
}
