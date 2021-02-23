import { STORAGE_DIR } from './config';
import { setupDatabase } from './database';
import { ExpressServer } from './server/expressServer';
import { logger } from './tools/logger';

async function launch(): Promise<void> {
  logger.info(`Using storage directory ${STORAGE_DIR}`);
  logger.info('Preparing database...');
  await setupDatabase({
    temporary: false,
    appPath: STORAGE_DIR,
    loadExampleEntries: true,
  });
  logger.info('Starting webserver...');
  await ExpressServer.launch();
  logger.info('Ready');
}

launch().catch((e) => {
  if (e instanceof Error) {
    logger.error(e.message, {
      name: e.name,
      stack: e.stack,
    });
  } else {
    logger.error(e);
  }
});
