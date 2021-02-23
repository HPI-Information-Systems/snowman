import { Response } from 'express';

import * as service from '../services/AlgorithmService';
import { Request } from '../types/util';
import { Controller } from './Controller';

export async function addAlgorithm(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.addAlgorithm);
}

export async function deleteAlgorithm(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.deleteAlgorithm);
}

export async function getAlgorithm(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.getAlgorithm);
}

export async function getAlgorithms(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.getAlgorithms);
}

export async function setAlgorithm(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.setAlgorithm);
}
