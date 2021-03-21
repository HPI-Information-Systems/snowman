import { PREBUILT_DATABASE_APP_PATH } from './config';
import { setupDatabase } from './database';
import { logger } from './tools/logger';

async function launch(): Promise<void> {
  logger.info(`Prebuilding database...`);
  await setupDatabase({
    temporary: false,
    appPath: PREBUILT_DATABASE_APP_PATH,
    loadExampleEntries: true,
    usePreBuiltDatabase: false,
  });
  logger.info('Done');
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
