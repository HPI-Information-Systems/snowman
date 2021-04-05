import { Response } from 'express';

import * as service from '../services/BenchmarkService';
import { Request } from '../types/util';
import { Controller } from './Controller';

export async function calculateExperimentIntersectionCount(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(
    request,
    response,
    service.calculateExperimentIntersectionCount
  );
}

export async function calculateExperimentIntersectionRecords(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(
    request,
    response,
    service.calculateExperimentIntersectionRecords
  );
}

export async function calculateExperimentIntersectionCounts(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(
    request,
    response,
    service.calculateExperimentIntersectionCounts
  );
}

export async function getBinaryMetrics(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.getBinaryMetrics);
}
