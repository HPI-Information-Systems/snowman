import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import http from 'http';
import { join } from 'path';
import path from 'path';

import { OPENAPI_YAML_PATH } from '../config';
import { cliArgs } from '../tools/cli';
import { identifyResponse } from './identifyResponse';

export class APIServer {
  protected readonly app: express.Express;
  protected server?: http.Server;

  protected constructor() {
    this.app = express();
    this.setupMiddleware();
  }

  protected setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json({ limit: '14MB' }));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.app.get(
      // Compatibility with rest.sh - https://rest.sh/#/openapi
      ['/openapi', '/api/openapi', '/openapi.yaml', '/api/openapi.yaml'],
      (_req: express.Request, res: express.Response) =>
        res.sendFile(OPENAPI_YAML_PATH)
    );
    this.app.get('/api', (_req: express.Request, res: express.Response) => {
      res.status(200).send('Snowman API');
    });
    this.app.get(
      '/api/identify',
      (_req: express.Request, res: express.Response) => {
        res.status(200).send(identifyResponse);
      }
    );

    this.app.use('/', express.static(join(__dirname, '..', '..', '..', 'app')));
    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: OPENAPI_YAML_PATH,
        operationHandlers: path.join(__dirname),
      })
    );
    this.app.use(
      (
        err: { status: number; message?: string; errors?: string },
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
      ) => {
        res.status(err.status || 500).json({
          message: err.message || err,
          errors: err.errors || '',
        });
      }
    );
    this.app.use((_req, res) => {
      res.sendFile(join(__dirname, '..', '..', '..', 'app', 'index.html'));
    });
  }

  protected launch(): void {
    this.server = http
      .createServer(this.app)
      .listen(cliArgs.port, cliArgs.hostname);
  }

  close(): void {
    if (this.server !== undefined) {
      this.server.close();
    }
  }

  static launch(): APIServer {
    const server = new APIServer();
    try {
      server.launch();
      return server;
    } catch (error) {
      server.close();
      throw error;
    }
  }
}
