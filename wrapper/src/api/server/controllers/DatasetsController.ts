import { Response } from 'express';

import * as service from '../services/DatasetsService';
import { Request } from '../types/util';
import { Controller } from './Controller';

export async function addDataset(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.addDataset);
}

export async function deleteDataset(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.deleteDataset);
}

export async function deleteDatasetFile(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.deleteDatasetFile);
}

export async function getDataset(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.getDataset);
}

export async function getDatasetFile(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.getDatasetFile, {
    responseIsFile: true,
  });
}

export async function getDatasets(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.getDatasets);
}

export async function setDataset(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.setDataset);
}

export async function setDatasetFile(
  request: Request,
  response: Response
): Promise<void> {
  await Controller.handleRequest(request, response, service.setDatasetFile, {
    requestIsFile: true,
  });
}
