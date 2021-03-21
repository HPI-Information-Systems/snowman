import { Response } from 'express';

import * as service from '../services/ExperimentsService';
import { Request } from '../types/util';
import { Controller } from './Controller';

export async function addExperiment(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.addExperiment);
}

export async function deleteExperiment(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.deleteExperiment);
}

export async function getExperiment(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.getExperiment);
}

export async function getExperiments(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.getExperiments);
}

export async function setExperiment(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.setExperiment);
}

export async function getExperimentFile(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.getExperimentFile);
}

export async function setExperimentFile(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.setExperimentFile, {
    requestIsFile: true,
  });
}

export async function deleteExperimentFile(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(
    request,
    response,
    service.deleteExperimentFile
  );
}
